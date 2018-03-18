import React, {Component} from 'react';
import styled from 'styled-components';
import Timer from "../Timer";
import RenderIf from "../general/RenderIf";
import {Button} from "../ui";
import Exercise from "./Exercise";

const OverMessage = styled.h4`
    text-align:center;
    font-size: 18px;
    font-weight: 400;
    margin-top: 10px;
`;

export default class Crossfit extends Component {
    state = {
        start: false,
        exercises: this.props.exercises,
        activeExercise: this.props.exercises.length - 1,
        time: this.props.time,
        ended: false
    }

    startTraining = () => {
        this.setState({
            start: true
        })
    }

    stopTraining = () => {
        this.setState({
            start: false,
            ended: true
        })
    }

    checkExercise = (time) => {
        let oneExTime = this.props.time / this.state.exercises.length;
        let currentEx = Math.ceil(time / oneExTime) - 1;
        if(currentEx >= 0){
            this.setState({
                activeExercise: currentEx,
                time
            })
        } else {
            this.stopTraining();
            this.setState({
                time
            })
        }
    }

    render() {
        let exercise = this.state.exercises[this.state.activeExercise];
        return (
            <div>
                <RenderIf condition={this.state.start}>
                    <Exercise {...exercise} />
                </RenderIf>
                <Timer pause={!this.state.start}
                       time={this.state.time}
                       onTimerChange={this.checkExercise}
                       onTimerEnd={this.stopTraining}
                       reverse
                />
                <RenderIf condition={!this.state.start && !this.state.ended}>
                    <Button type="start" onClick={this.startTraining}>
                        Start
                    </Button>
                </RenderIf>
                <RenderIf condition={this.state.start && !this.state.ended}>
                    <Button type="stop" onClick={this.stopTraining}>
                        Stop
                    </Button>
                </RenderIf>
                <RenderIf condition={this.state.ended}>
                    <OverMessage>Тренировка окончена</OverMessage>
                    {/*TODO: Дописать информацию о законченой тренировке */}
                </RenderIf>
            </div>
        )
    }
}