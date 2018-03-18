import React, {Component} from 'react';
import {Button} from "../ui";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RenderIf from "../general/RenderIf";

const Image = styled.img`
    max-width:90%;
    display: block;
    margin: 10px auto 10px;
`;
const Description = styled.div`
   width: 90%;
   margin:10px auto 0;
   display:block;
   padding:0 15px;
`;

const Name = styled.h3`
    font-size:16px;
    text-align:center;
    text-transform: uppercase;
    font-weight:400;
`;

const Count = styled.div`
    font-size:48px;
    font-weight:400;
    text-align:center;
    margin-top: 5px;
`;

const Spoiler = styled.span`
    font-weight: 300;
    font-size: 15px;
    text-align:center;
    display: block;
    text-decoration: underline;
`
const Wrapper = styled.div`
    position: relative;
`;
export default class Exercise extends Component {
    state = {
        visibleDescription: false
    }

    toggleDescription = () => {
        this.setState((prevState) => {
            return {
                visibleDescription: !prevState.visibleDescription
            }
        })
    }

    render() {
        const {name, count, image, description} = this.props;
        return (
            <Wrapper>
                <Name>
                    {name}
                </Name>
                <RenderIf condition={count}>
                    <Count>
                        {count}
                    </Count>
                </RenderIf>
                <Image src={image}/>
                <Spoiler onClick={this.toggleDescription}>{this.state.visibleDescription ? "Скрыть " : "Показать "}
                    описание
                    упражнения</Spoiler>
                <RenderIf condition={this.state.visibleDescription}>
                    <Description>
                        {description}
                    </Description>
                </RenderIf>
            </Wrapper>
        )
    }
};