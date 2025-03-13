import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import {useState} from "react";
import useAuthLogin from "../../hooks/api/useAuthLogin.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {ILoginSuccessResponse} from "../../interfaces/dto/ILoginSuccessResponse.ts";
import {ButtonGroup, InputGroupWrapper, FormWrapper, InputGroup, LabelWrapper, InputWrapper} from "./Form.styles.ts";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [rawPassword, setRawPassword] = useState('');

    const {mutate} = useAuthLogin();
    const navigate = useNavigate();

    const onClickJoin = () => {
        navigate('/join');
    }

    const onClickLogin = () => {
        const loadingToastId = toast.loading('잠시만 기다려주세요..')

        mutate(
            { email, rawPassword },
            {
                onSuccess: (response: ILoginSuccessResponse) => {
                    console.log(response);
                    toast.update(loadingToastId, {
                        render: `성공적으로 로그인 되었습니다!`,
                        type: 'success',
                        isLoading: false,
                        autoClose: 3000
                    });
                    navigate('/');
                },
                onError: (error) => {
                    let errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

                    if (error.status === 400) {
                        errorMessage = '입력값이 비어있는지 확인해주세요!';
                    } else if (error.status === 404) {
                        errorMessage = '회원 정보가 유효하지 않습니다!';
                    }

                    toast.update(loadingToastId, {
                        render: errorMessage,
                        type: 'error',
                        isLoading: false,
                        autoClose: 3000,
                    })
                }
            }
        )
    }

    return (
        <FormWrapper>
            <InputGroupWrapper>
                <InputGroup>
                    <LabelWrapper>
                        <div>이메일</div>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input
                            placeholder='이메일'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputWrapper>
                </InputGroup>
                <InputGroup>
                    <LabelWrapper>
                        <div>비밀번호</div>
                    </LabelWrapper>
                    <InputWrapper>
                        <Input
                            type='password'
                            placeholder='비밀번호'
                            value={rawPassword}
                            onChange={(e) => setRawPassword(e.target.value)}
                        />
                    </InputWrapper>
                </InputGroup>
            </InputGroupWrapper>
            <ButtonGroup>
                <Button
                    color='black'
                    onClick={onClickLogin}
                >
                    로그인
                </Button>

                <Button
                    onClick={onClickJoin}
                >
                    회원가입
                </Button>
            </ButtonGroup>
        </FormWrapper>
    )
}

export default LoginForm;