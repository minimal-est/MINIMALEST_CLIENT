import styled from "styled-components";
import {theme} from "./theme.ts";

const BackgroundContainer = styled.div`
    background-color: ${theme.user.backgroundColor};
    background-image: ${theme.user.backgroundImage};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    width: 100%;
    min-height: 100vh;
`;

export default BackgroundContainer;