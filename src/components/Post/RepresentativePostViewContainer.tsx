import RepresentativePostView from "./RepresentativePostView.tsx";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";
import {StyledDivider, StyledTitle} from "./postView.styles.ts";
import usePostViewsWithRole from "../../hooks/api/usePostViewsWithRole.tsx";

interface Props {
    author: string;
}

const StyledPostView = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: ${theme.colors.ghostwhite};
    padding: 20px;
    border-radius: 10px;
    max-width: 900px;

    @media (max-width: 900px) {
        width: 95%;
    }
`;

const RepresentativePostViewContainer = (props: Props) => {
    const {data} = usePostViewsWithRole(props.author, 'REPRESENTATIVE');

    return (
        (data && data.numberOfElements > 0 &&
            <StyledPostView>
                <StyledTitle>{data.content[0].title}</StyledTitle>
                <StyledDivider />
                <RepresentativePostView content={data.content[0].content} />
            </StyledPostView>
        )
    )
}

export default RepresentativePostViewContainer;