import React, {Component} from 'react';
import Timer from "../Timer";
import {Button} from "../ui";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RenderIf from "../general/RenderIf";
import Exercise from "./Exercise";

const ControllerWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width:90%;
    margin:0 auto;
`;

const OverMessage = styled.h4`
    text-align:center;
    font-size: 18px;
    font-weight: 400;
    margin-top: 10px;
`;

export default class SimpleTraining extends Component {
    static propTypes = {
        exercises: PropTypes.array.isRequired
    }
    state = {
        exercises: this.props.exercises.map((exercise) => {
            exercise.done = false;
            return exercise;
        }),
        actualExercise: this.props.exercises,
        pause: true,
        ended: false,
        time: 0,
        activeExercise: 0
    }

    startTraining = () => {
        this.setState({
            pause: false
        })
    }

    stopTraining = () => {
        this.setState({
            pause: true,
            ended: true
        })
    }

    changeTime = (time) => {
        this.setState({
            time
        });
    }

    nextExercise = () => {
        this.setState((prevState) => {
            let nextIndex = ++prevState.activeExercise;
            return {
                activeExercise: nextIndex > this.state.exercises.length - 1 ? 0 : nextIndex,
                actualExercise: this.state.exercises.filter(exercise => !exercise.done)
            }
        }, () => {
            if(this.state.actualExercise.length < 1) {
                this.stopTraining();
                return;
            }
            if(this.state.exercises[this.state.activeExercise].done){
                this.nextExercise();
            }
        })
    }

    doneExercise = () => {
        this.setState((prevState) => {
            prevState.exercises[this.state.activeExercise].done = true;
            prevState.exercises[this.state.activeExercise].time = prevState.time;
            return prevState;
        }, this.nextExercise);
    }

    timePrepare = (index) => {
        let resTime = 0,
            sumTime = 0;
        this.state.exercises.map((exercise, i) => {
            resTime = exercise.time - sumTime;
            sumTime += resTime;
            if(index === i) return;
        });

    }

    render() {
        let exercise = this.state.exercises[this.state.activeExercise];
        return (
            <div>
                <RenderIf condition={!this.state.pause}>
                    <Exercise {...exercise} />
                    <ControllerWrapper>
                        <Button inline type="simple" size="small"
                                onClick={this.doneExercise}>Выполнено</Button>
                        <RenderIf condition={this.state.actualExercise && this.state.actualExercise.length > 1}>
                            <Button inline type="grey" size="small"
                                    onClick={this.nextExercise}>Пропустить</Button>
                        </RenderIf>
                    </ControllerWrapper>
                </RenderIf>
                <Timer pause={this.state.pause}
                       onTimerChange={this.changeTime}
                       time={this.state.time}
                />
                <RenderIf condition={this.state.pause && !this.state.ended}>
                    <Button type="start" onClick={this.startTraining}>
                        Start
                    </Button>
                </RenderIf>
                <RenderIf condition={!this.state.pause && !this.state.ended}>
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