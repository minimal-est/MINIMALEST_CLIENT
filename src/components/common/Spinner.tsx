import {PulseLoader} from "react-spinners";
import {theme} from "../styles/theme.ts";
import styled from "styled-components";

const StyledSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Spinner = () => {
    return (
        <StyledSpinner>
            <PulseLoader
                color={theme.colors.sienna}
                size={15}
                aria-label='불러오는 중..'
                style={{
                }}
            />
        </StyledSpinner>
    )
}

export default Spinner;