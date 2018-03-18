import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {notEmpty} from '../../utils';

const menuClosed = 'translate(calc(-100% + 75px), 0)';
const menuOpen = 'translate(0, 0)';
const Menu = styled.nav`
    height: 110vh;
    z-index: 100;
    padding-top:5px;
    padding-left:40px;
    width: 90vw;
    max-width: 300px;
    overflow: hidden;
    position: fixed;
    transform: ${props => props.open ? menuOpen : menuClosed};
    transition: .5s transform;
    background-color: #777;
`;

const MenuLink = styled(NavLink)`
    display: block;
    text-decoration: none;
    font-size: 18px;
    font-weight: 200;
    letter-spacing: 0.05em;
    margin-bottom: 30px;
    color:#ccc;
    &:before{
        content: "> ";
    }
    &.active{
    font-weight:400;
        color: #fff;
    }
`;

const LogoHeader = styled.h1`
    font-size: 36px;
    font-weight:200;
    letter-spacing: 0.1em;
    padding-top: 40px;
    margin-bottom: 30px;
`;

const Burger = styled.div`
      margin: 0 auto;
      background-color: #dcdcdc;
      position: absolute;
      right:20px;
      top: 25px;
      z-index: 2;
      &::after, &::before, & {
        width: 30px;
        height: 2px;
        display: block;
      }
      &::after, &::before {
        content: " ";
        background-color: inherit;
        position: absolute;
      }
      &::before {
          top: 18px;
      }
      &::after {
            top: 9px;
      }
`;

export default class MenuContainer extends Component {
    state = {
        open: false
    }

    toggleMenu = () => {
        this.setState((prevState) => {
            return {
                open: !prevState.open
            }
        })
    }

    closeMenu = (e) => {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div ref={(node) => this.wrapper = node}>
                <Menu className={notEmpty(this.props.className)}
                      open={this.state.open}>
                    <Burger open={this.state.open} onClick={this.toggleMenu}/>
                    <LogoHeader><b>T</b>rainee</LogoHeader>
                    <MenuLink to="/training/" onClick={this.closeMenu}>
                        Start Training
                    </MenuLink>
                    <MenuLink to="/coach/" onClick={this.closeMenu}>
                        Select Coach
                    </MenuLink>
                    <MenuLink to="/statistic/" onClick={this.closeMenu}>
                        Statistics
                    </MenuLink>
                    <MenuLink to="/settings/" onClick={this.closeMenu}>
                        Settings
                    </MenuLink>
                </Menu>
            </div>
        )
    }
}