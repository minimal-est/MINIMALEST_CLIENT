import styled from "styled-components";
import {theme} from "../styles/theme.ts";

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;
    gap: 20px;
    
    width: 900px;
    @media (max-width: 900px) {
        width: 100%;
    }
`;

export const InputGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;


export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const LabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ErrorWrapper = styled.div`
    color: ${theme.colors.red};
    font-size: 12px;
`;