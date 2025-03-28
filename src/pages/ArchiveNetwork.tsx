import {useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const ArchiveNetwork = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.warn('아직 준비중입니다! 빠른 시일 내에 제공 하겠습니다🔥', {
            autoClose: 3000,
        });
        navigate('/');
    }, []);

    return (
        <div></div>
    )
}

export default ArchiveNetwork;