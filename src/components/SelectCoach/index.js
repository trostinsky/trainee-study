import React, {Component} from 'react';
import styled from "styled-components";
import {Heading, Button} from "../ui";
import data from "../../data";
const SearchInput = styled.input`
    border:none;
    border-bottom: 2px solid #999;
    background-color: transparent;
    height: 50px;
    width:95%;
    box-sizing:border-box;
    padding:10px 15px 5px;
    font-size:18px;
    margin:0 auto 20px;
    display:block;
    color: #fff;
    &:focus{
        outline:none;
    }
`;

const CoachList = styled.ul`
    
`;

const CoachName = styled.span`
    font-size: 18px;
`;
const CoachImage = styled.img`
    width:50px;
    height:50px;
    margin-right: 10px;
`;
const CoachRating = styled.span`
    margin-left: auto;
    font-size: 14px;
`;
const CoachItemWrapper = styled.li`
    display: flex;
    align-items:center;
    justify-content: flex-end;
    padding:0 15px;
    margin-bottom: 8px;
    background-color: #555;
`;

const CoachButton = styled(Button)`
    margin: 0;
    margin-left: 15px;
`
const CoachSelected = styled.span`
    margin: 0;
    margin-left: 15px;
    min-width: 70px;
    font-size: 11px;
    text-transform: uppercase;
    text-align:center;
`;
const CoachItem = ({name, image, rating, selected, onClick}) => {
    return (
        <CoachItemWrapper>
            <CoachImage src={image}/>
            <CoachName>{name}</CoachName>
            <CoachRating>{rating}</CoachRating>
            {selected ? <CoachSelected>Выбран</CoachSelected> :
                <CoachButton onClick={onClick} type="simple" size="extrasmall" inline>Выбрать</CoachButton>}
        </CoachItemWrapper>
    )
};

export default class SelectCoach extends Component {
    state = {
        coachers: data.coachers,
        searchValue: ''
    }

    selectCoach = (index) => {
        this.setState((prevState) => {
            let coachers = prevState.coachers.map((coach, i) => {
                coach.selected = false;
                if (i === index) coach.selected = true;
                return coach;
            })
            return {
                coachers
            };
        })
    }

    filterCoach = (e) => {
        let value = e.target.value.toUpperCase();
        this.setState({
            coachers: data.coachers.filter(coach => {
                let name = coach.name.toUpperCase();
                return name.includes(value);
            }),
            searchValue: value
        })
    }

    render() {
        return (
            <div>
                {/*<Heading>Select Coach</Heading>*/}
                <SearchInput type="text" placeholder="Print Name..."
                             value={this.state.searchValue}
                             onChange={this.filterCoach}
                />
                <CoachList>
                    {this.state.coachers.map((coach, index) => {
                        return <CoachItem {...coach} key={index} onClick={this.selectCoach.bind(this, index)}/>
                    })}
                </CoachList>
            </div>
        )
    }
}