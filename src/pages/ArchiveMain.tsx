import {useParams} from "react-router-dom";
import ArchiveLayout from "../layouts/ArchiveLayout.tsx";
import PostPreviewsContainer from "../components/Post/PostPreviewsContainer.tsx";

const ArchiveMain = () => {

    const params = useParams();
    const author = params.author ?? "";

    return (
        <div>
            <ArchiveLayout author={author}>
                <PostPreviewsContainer author={author} />
            </ArchiveLayout>
        </div>
    );
};

export default ArchiveMain;