import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import useAuthLogin from "../../hooks/api/useAuthLogin.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    ButtonGroup,
    InputGroupWrapper,
    FormWrapper,
    InputGroup,
    LabelWrapper,
    InputWrapper,
    ErrorWrapper
} from "./Form.styles.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {ILoginRequest} from "../../interfaces/dto/ILoginRequest.ts";
import {AxiosError} from "axios";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IValidationError} from "../../interfaces/dto/IValidationError.ts";
import GoogleIconButton from "../Button/GoogleIconButton.tsx";
import {IAuthType} from "../../interfaces/dto/IAuthType.ts";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<ILoginRequest>();

    const {mutate} = useAuthLogin();
    const navigate = useNavigate();

    const onClickJoin = () => {
        navigate('/join');
    }

    const onSubmit: SubmitHandler<ILoginRequest> = (data) => {
        const loadingToastId = toast.loading('잠시만 기다려주세요..');

        const requestData = {
            ...data,
            authType: IAuthType.JWT,
        }

        mutate(requestData, {
                onSuccess: () => {
                    toast.update(loadingToastId, {
                        render: `성공적으로 로그인 되었습니다!`,
                        type: 'success',
                        isLoading: false,
                        autoClose: 3000
                    });
                    navigate('/');
                },
                onError: (error: AxiosError<IApiResponse<Array<IValidationError>>>) => {
                    let message = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

                    if (error.status === 400) {
                        if (error.response) {
                            const data = error.response.data;
                            message = data.message;
                            const validationErrors = data['data'];
                            validationErrors?.forEach((error: IValidationError) => {
                                setError(error.field as keyof ILoginRequest, {
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
            }
        )
    }

    const onClickGoogleIcon = () => {
        const requestGoogleOAuthUri =
            'https://accounts.google.com/o/oauth2/auth' +
            '?client_id=688506214339-beda52o8rtufe2c98nndck5hb5eqmddv.apps.googleusercontent.com' +
            '&redirect_uri=https://minimalest.kr/api/auth/oauth/google&response_type=code' +
            '&scope=openid%20email%20profile';

        const requestGoogleOAuth = async () => {
            try {
                window.location.href = requestGoogleOAuthUri;
            } catch (e) {
                console.error(e);
            }
        }

        requestGoogleOAuth();
    }

    return (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <InputGroupWrapper>
                <InputGroup>
                    <LabelWrapper>
                        <label htmlFor='email'>이메일</label>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input
                            type='text'
                            placeholder='이메일'
                            {...register('email')}
                        />
                        <ErrorWrapper>
                            {errors.email && <span>{errors.email.message}</span>}
                        </ErrorWrapper>
                    </InputWrapper>
                </InputGroup>
                <InputGroup>
                    <LabelWrapper>
                        <label htmlFor='rawPassword'>비밀번호</label>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input
                            type='password'
                            placeholder='비밀번호'
                            {...register('rawPassword')}
                        />
                        <ErrorWrapper>
                            {errors.rawPassword && <span>{errors.rawPassword.message}</span>}
                        </ErrorWrapper>
                    </InputWrapper>
                </InputGroup>
            </InputGroupWrapper>
            <ButtonGroup>
                <Button
                    color='black'
                    type={"submit"}
                >
                    로그인
                </Button>

                <Button
                    onClick={onClickJoin}
                >
                    회원가입
                </Button>
            </ButtonGroup>
            <div>
                회원가입 없이 바로 시작하기
            </div>
            <ButtonGroup>
                <GoogleIconButton type="button" onClick={onClickGoogleIcon} />
            </ButtonGroup>
        </FormWrapper>
    )
}

export default LoginForm;