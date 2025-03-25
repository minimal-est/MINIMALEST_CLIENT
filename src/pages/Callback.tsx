import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";

const Callback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const isNew = params.get('isNew');
        const error = params.get('error');

        if (isNew && isNew === 'true') {
            // 새로 회원가입
            toast.success('성공적으로 가입되었습니다! 🎉', {
                autoClose: 3000,
            });
            navigate('/');
            return;
        }

        if (isNew && isNew === 'false') {
            // 기존 로그인
            toast.success('로그인 성공!', {
                autoClose: 3000,
            });
            navigate('/');
            return;
        }

        if (error && error === 'conflict') {
            // 이미 존재하는 회원
            toast.error('이미 가입된 이메일입니다!', {
                autoClose: 3000,
            });
            navigate('/login');
            return;
        }

        // 정상적인 경로가 아닐경우
        toast.error('정상적인 요청이 아닙니다!', {
            autoClose: 3000,
        });
        navigate('/login');
        return;

    }, []);

    return <></>;
}

export default Callback;