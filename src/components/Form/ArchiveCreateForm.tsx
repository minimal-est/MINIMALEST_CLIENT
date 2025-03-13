import {
    ButtonGroup,
    ErrorWrapper,
    FormWrapper,
    InputGroup,
    InputGroupWrapper,
    InputWrapper,
    LabelWrapper
} from "./Form.styles.ts";
import Input from "../Input/Input.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {IArchiveCreateRequest} from "../../interfaces/dto/IArchiveCreateRequest.ts";
import useArchiveCreate from "../../hooks/api/useArchiveCreate.tsx";
import Button from "../Button/Button.tsx";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IValidationError} from "../../interfaces/dto/IValidationError.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import fetchEmailFromToken from "../../utils/fetchEmailFromToken.ts";

const ArchiveCreateForm = () => {
    const {register, handleSubmit, setError, formState: { errors }} = useForm<IArchiveCreateRequest>()
    const {mutate} = useArchiveCreate();
    const navigate = useNavigate();

    useEffect(() => {
        const validateLogined = async () => {
            const email = await fetchEmailFromToken();
            if (!email) {
                toast.error('권한이 없습니다! 로그인 먼저 해주세요.');
                navigate(`/login`);
            }
        }

        validateLogined();
    }, []);

    const onSubmit: SubmitHandler<IArchiveCreateRequest> = (data) => {
        const loadingToastId = toast.loading('잠시만 기다려주세요..')

        mutate(data, {
            onSuccess: () => {
                toast.update(loadingToastId, {
                    render: `성공적으로 개설 되었습니다! 🎉`,
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000
                });
                navigate(`/archive/${data.author}`);
            },
            onError: (error: AxiosError<IApiResponse<Array<IValidationError>>>) => {
                let message = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

                if (error.status === 400) {
                    if (error.response) {
                        const data = error.response.data;
                        message = data.message;
                        const validationErrors = data['data'];
                        validationErrors?.forEach((error: IValidationError) => {
                            setError(error.field as keyof IArchiveCreateRequest, {
                                type: 'manual',
                                message: error.message,
                            });
                        });
                    }
                } else if (error.status === 404) {
                    message = '회원 정보가 유효하지 않습니다!';
                }

                toast.update(loadingToastId, {
                    render: message,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                })
            }
        })
    }

    return (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <InputGroupWrapper>
                <InputGroup>
                    <LabelWrapper>
                        <label htmlFor='author'>작가이름</label>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input type='text' {...register('author')} />
                        <ErrorWrapper>
                            {errors.author && <span>{errors.author.message}</span>}
                        </ErrorWrapper>
                    </InputWrapper>
                </InputGroup>
                <InputGroup>
                    <LabelWrapper>
                        <label htmlFor='mainTitle'>아카이브 제목</label>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input type='text' {...register('mainTitle')} />
                        <ErrorWrapper>
                            {errors.mainTitle && <span>{errors.mainTitle.message}</span>}
                        </ErrorWrapper>
                    </InputWrapper>
                </InputGroup>
                <InputGroup>
                    <LabelWrapper>
                        <label htmlFor='subTitle'>아카이브 부제목</label>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input type='text' {...register('subTitle')} />
                        <ErrorWrapper>
                            {errors.subTitle && <span>{errors.subTitle.message}</span>}
                        </ErrorWrapper>
                    </InputWrapper>
                </InputGroup>
                <InputGroup>
                    <LabelWrapper>
                        <label htmlFor='firstFolderName'>첫 폴더 이름</label>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input type='text' {...register('firstFolderName')} />
                        <ErrorWrapper>
                            {errors.firstFolderName && <span>{errors.firstFolderName.message}</span>}
                        </ErrorWrapper>
                    </InputWrapper>
                </InputGroup>
                <ButtonGroup>
                    <Button type='submit' color='black'>생성하기</Button>
                </ButtonGroup>
            </InputGroupWrapper>
        </FormWrapper>
    )
}

export default ArchiveCreateForm;