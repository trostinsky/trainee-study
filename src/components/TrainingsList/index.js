import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import data from "../../data";
import styled from "styled-components";
import {Heading} from '../ui';

const TrainingItem = styled.li`
    margin-bottom: 20px;
    padding-left: 30px;
    font-size: 16px;
`;

const Type = styled.span`
    font-size: 13px;
    color: #bbb;
    margin-left: 10px;
`;

const TrainingList = () => {
    const list = data.trainingList;
    return (
        <div>
            <Heading>Aviavible trainings today</Heading>
            <ul>
                {list.map((training, index) => {
                    return (
                        <TrainingItem key={index}>
                            <Link to={`/training/${training.id || index}/`}>
                                <img src={training.image} alt=""/>
                                {training.name}
                            </Link>
                            <Type>{training.type}</Type>
                        </TrainingItem>
                    )
                })}
            </ul>
        </div>
    )
}
export default TrainingList;