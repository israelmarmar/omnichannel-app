import styled from 'styled-components';

export const Input = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    width: 296px;
    height: 35px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #CCCFDE;
    border-radius: 5px;
    padding-left: 7px;
    margin-right: 15px;

    svg {
        fill: #117EFF;
    }

    input:focus {
        outline: none;
    }

    input {
        width: 100%;
        margin-left: 7px;
        border-style: none;
    }
`;