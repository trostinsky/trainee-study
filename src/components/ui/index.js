import React, {Component} from "react";
import styled from 'styled-components';

export const Heading = styled.h2`
    font-size: 20px;
    text-align: center;
    font-weight: 300;
    padding-top:30px;
    margin-bottom:40px;
`;

const buttonType = {
    start: "#62d061",
    simple: "#1a689a",
    stop: "#e4414c",
    grey: "#a1a1a1"
}
const buttonSize = {
    small: {
        font: '13px',
        padding: '10px 15px',
        minWidth: '100px'
    },
    extrasmall: {
        font: '11px',
        padding: '5px 10px',
        minWidth: '70px'
    },
    normal: {
        font: '16px',
        padding: '10px 20px',
        minWidth: '150px'
    },
    large: {
        font: '18px',
        padding: '15px 30px',
        minWidth: '150px'
    }
}
export const Button = styled.button`
       border-radius: 5px;
       background-color: ${props => props.type ? buttonType[props.type] : buttonType.simple};
       color: #fff;
       font-size: ${props => props.size ? buttonSize[props.size].font : buttonSize.normal.font};
       padding: ${props => props.size ? buttonSize[props.size].padding : buttonSize.normal.padding};
       border:none;
       outline: none;
       margin: 20px auto;
       display: ${props => props.inline ? 'inline-block' : 'block'};
       text-transform: uppercase;
       min-width: ${props => props.size ? buttonSize[props.size].minWidth : buttonSize.normal.minWidth};
`;