import React, {Component} from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';

const TimerWrapper = styled.div`
    font-size: 64px;
    text-align:center;
`;

export default  class Timer extends Component{
    static propTypes = {
        time: PropTypes.number.isRequired,
        onTimerChange: PropTypes.func,
        onTimerEnd: PropTypes.func,
        pause: PropTypes.bool,
        reverse: PropTypes.bool,
        delay: PropTypes.number
    }

    static defaultProps = {
        time: 0,
        delay: 1,
        onTimerChange: () => {},
        onTimerEnd: () => {}
    }

    state = {
        time: this.props.time,
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.time === this.state.time){
            return false;
        }
        return nextState.time % this.props.delay === 0;
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            time: nextProps.time
        })
    }

    componentDidUpdate(prevProps, prevState){
        this.props.onTimerChange(this.state.time);
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            if(this.props.reverse && this.state.time == 0){
                clearInterval(this.interval);
                return;
            }
            if(!this.props.pause){
                this.setState((prevState) => {
                    this.props.reverse ? prevState.time-- : prevState.time++;
                    return prevState;
                })
            }
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render(){
        let minutes = Math.floor(this.state.time / 60);
        let seconds = this.state.time  % 60;
        return (
            <TimerWrapper>
                <span>{
                    (minutes < 10) ? "0" + minutes : minutes
                }</span>
                :
                <span>{
                    (seconds < 10) ? "0" + seconds : seconds
                }</span>
            </TimerWrapper>
        )
    }
}