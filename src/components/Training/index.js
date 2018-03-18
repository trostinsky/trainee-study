import React, {Component} from 'react';
import styled from 'styled-components';
import {Heading} from '../ui';
import data from "../../data";
import RenderIf from "../general/RenderIf";
import Crossfit from "./Crossfit";
import SimpleTraining from "./SimpleTraining";

const Type = styled.h3`
    font-size: 18px;
    color: #fff;
    margin-top: 0px;
    text-align: center;
`;

const HeadingTraining = styled(Heading)`
    background-color: #61d061;
    padding:20px 0;
    font-weight: 400;
    margin-bottom: 10px;
`;

export default class Training extends Component {
    state = {
        name: data.trainingList[this.props.match.params.id].name,
        type: data.trainingList[this.props.match.params.id].type
    }

    render() {
        return (
            <div>
                <HeadingTraining>{this.state.name}</HeadingTraining>
                {/*<Type>{this.state.type}</Type>*/}
                <RenderIf condition={this.state.type === 'simple'}>
                    <SimpleTraining exercises={data.trainingList[this.props.match.params.id].exercises} />
                </RenderIf>
                <RenderIf condition={this.state.type === 'crossfit'}>
                    <Crossfit exercises={data.trainingList[this.props.match.params.id].exercises}
                              time={data.trainingList[this.props.match.params.id].time} />
                </RenderIf>
            </div>
        )
    }
}