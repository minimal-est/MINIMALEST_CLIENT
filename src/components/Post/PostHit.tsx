import TextWithBackground from "../Text/TextWithBackground.tsx";

const PostHit = ({hitCount}: {hitCount: number}) => {
    return (
        <TextWithBackground
            fontSize='12px'
        >
            {hitCount} <span style={{fontSize: '10px'}}>HIT</span>
        </TextWithBackground>
    )
}

export default PostHit;