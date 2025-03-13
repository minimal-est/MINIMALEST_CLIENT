import axios, {AxiosError} from "axios";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IFileResponse} from "../../interfaces/dto/IFileResponse.ts";
import {toast} from "react-toastify";
import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import instance from "../../utils/instance.ts";
import useMemberJoin from "../../hooks/api/useMemberJoin.tsx";
import {useNavigate} from "react-router-dom";
import {
    ButtonGroup,
    ErrorWrapper,
    FormWrapper,
    InputGroup,
    InputGroupWrapper,
    InputWrapper,
    LabelWrapper
} from "./Form.styles.ts";
import Thumbnail from "../Post/Thumbnail.tsx";
import styled from "styled-components";
import {IValidationError} from "../../interfaces/dto/IValidationError.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {IMemberJoinRequest} from "../../interfaces/dto/IMemberJoinRequest.ts";

const ProfilePreviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfilePreview = styled.div`
    width: 100px;
    height: 100px;
    object-fit: cover;

    border-radius: 50%;
    overflow: hidden;

    background-image: url("/assets/M.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const Join = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        watch
    } = useForm<IMemberJoinRequest>();

    const {mutate} = useMemberJoin();
    const navigate = useNavigate();
    const profileImageUrl = watch("profileImageUrl");

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error('이미지를 선택해주세요!', {
                autoClose: 3000,
            });
            return;
        }

        const uploadData = new FormData();
        uploadData.append("file", file);

        const loadingToastId = toast.loading('이미지 업로드 중입니다..');

        try {
            const response = await instance.post<IApiResponse<IFileResponse>>("/api/file", uploadData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const data = response.data['data']!;
            const virtualUrl = data.virtualUrl;

            setValue("profileImageUrl", virtualUrl);

            toast.update(loadingToastId, {
                render: '업로드 성공!',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error) {
            event.target.value = "";
            let message = '서버 오류가 발생했습니다. 다시 시도해주세요!' + error;
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 413) {
                    // 용량이 너무 클 때
                    message = '파일 용량이 너무 큽니다!';
                }
            }
            toast.update(loadingToastId,{
                render: message,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    const onSubmit: SubmitHandler<IMemberJoinRequest> = (data) => {
        const loadingToastId = toast.loading('가입 진행 중입니다..');
        mutate(data, {
            onSuccess: () => {
                toast.update(loadingToastId, {
                    render: '가입 성공! 🎉',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });

                navigate('/login');
            },
            onError: (error: AxiosError<IApiResponse<Array<IValidationError>>>) => {
                let message = '서버 오류입니다! 잠시 후 다시 시도해주세요.';

                const response = error.response;
                const data = response?.data;

                if (error.status === 400) {
                    message = '필수 항목을 모두 입력해주세요!';
                    if (data && data.message) {
                        message = data.message;
                    }

                    const validationErrors = data?.data;
                    validationErrors?.forEach((error: IValidationError) => {
                        setError(error.field as keyof IMemberJoinRequest, {
                            type: 'manual',
                            message: error.message
                        });
                    });
                }

                if (error.status === 409) {
                    message = '이메일 또는 대표이름이 이미 존재합니다!';
                }

                toast.update(loadingToastId, {
                    render: message,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        })
    };

    const handleImageRemove = () => {
        setValue("profileImageUrl", "");
        const fileInput = document.getElementById("profileImageFile") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    }

    return (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <InputGroupWrapper>
                <div>
                    <span>이메일은 비밀번호를 찾거나 변경할 때 사용됩니다. 중요한 소식 또한 이메일로 전송됩니다.</span>
                </div>
                <InputGroup>
                    <LabelWrapper>
                        <label htmlFor="username">대표이름</label>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input type="text" {...register('username')} />
                        <ErrorWrapper>
                            {errors.username && <span>{errors.username.message}</span>}
                        </ErrorWrapper>
                    </InputWrapper>
                </InputGroup>
                <InputGroup>
                    <LabelWrapper>
                        <label htmlFor="email">이메일</label>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input type="email" {...register('email')} />
                        <ErrorWrapper>
                            {errors.email && <span>{errors.email.message}</span>}
                        </ErrorWrapper>
                    </InputWrapper>
                </InputGroup>
                <InputGroup>
                    <LabelWrapper>
                        <label htmlFor="rawPassword">비밀번호</label>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input type="password" {...register('rawPassword')} />
                        <ErrorWrapper>
                            {errors.rawPassword && <span>{errors.rawPassword.message}</span>}
                        </ErrorWrapper>
                    </InputWrapper>
                </InputGroup>
                <InputGroup>
                    <LabelWrapper>
                        <label htmlFor="profileImageFile">대표 프로필</label>
                    </LabelWrapper>
                    <Button color={"red"} size={"small"} onClick={handleImageRemove}>프로필 이미지 초기화</Button>
                    <Input
                        type="file"
                        id="profileImageFile"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </InputGroup>
                <ProfilePreviewWrapper>
                    <ProfilePreview>
                        {profileImageUrl && <Thumbnail src={profileImageUrl} />}
                    </ProfilePreview>
                </ProfilePreviewWrapper>
                <ButtonGroup>
                    <Button type={"submit"} color={"black"}>회원가입</Button>
                </ButtonGroup>
            </InputGroupWrapper>
        </FormWrapper>
    );
};

export default Join;
