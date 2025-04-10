import {useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import validateAuthorFromEmailToken from "../utils/validateAuthorFromEmailToken.ts";
import ArchiveLayout from "../layouts/ArchiveLayout.tsx";
import StyleJsonForm from "../components/Form/StyleJsonForm.tsx";

const ArchiveConfig = () => {
    const params = useParams();
    const author = params.author ?? "";
    const navigate = useNavigate();

    useEffect(() => {
        const validateLogin = async () => {
            const validationRes = await validateAuthorFromEmailToken(author);
            if (!validationRes.isValid) {
                toast.error('권한이 없습니다. 로그인 해주세요!', {
                    autoClose: 3000,
                })
                navigate(`/archive/${author}`);
            }
        }

        validateLogin();
    }, []);

    return (
        <ArchiveLayout author={author}>
            <StyleJsonForm author={author} />
        </ArchiveLayout>
    )
}

export default ArchiveConfig;