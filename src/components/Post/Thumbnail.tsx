import React from "react";
import styled from "styled-components";

type Props = React.ImgHTMLAttributes<HTMLImageElement>

const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Thumbnail = (props: Props) => {
    return (
        <StyledImg {...props} alt={props.alt}/>
    );
}

export default Thumbnail;