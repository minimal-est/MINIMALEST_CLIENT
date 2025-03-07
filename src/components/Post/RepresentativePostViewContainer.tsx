import RepresentativePostView from "./RepresentativePostView.tsx";
import usePostViewWithRole from "../../hooks/api/usePostViewWithRole.tsx";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";
import {StyledDivider, StyledTitle} from "./postView.styles.ts";

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
    const {data} = usePostViewWithRole(props.author, 'REPRESENTATIVE');

    return (
        (data &&
            <StyledPostView>
                <StyledTitle>{data.title}</StyledTitle>
                <StyledDivider />
                <RepresentativePostView content={data.content} />
            </StyledPostView>
        )
    )
}

export default RepresentativePostViewContainer;