import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"

const StyledNav = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 20px);
    padding: 10px 10px 0;
    margin-bottom: 10px;
    height: 48px;
    line-height: 48px;
    display: grid;
    grid-template-columns: 1fr 40px 40px 40px;
    background-color: #275386;
    color: white;
    h3 {
        font-size: 24px;
        padding: 0;
        margin: 0;
        position: relative;
        top: -8px;
    }
    img, span {
        display: inline-block;
        height: 32px;
        width: auto;
        margin-left: 5px;
        position: relative;
        span {
            display: block;
            position: absolute;
            top: -3px;
            right: -9px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 50%;
            color: white;
            background-color: red;
            font-size: 12px;
            text-align: center;
        }
    }
`

const NavBar = ({ menu, setRecipe, shoppingList, setViewList, pageTitle }) => {
    return (
        <StyledNav>
            <h3>{pageTitle}</h3>
            <Link to="/">
                <img src="/images/search.png" alt="Search" />
            </Link>
            <Link to="/list">
                <span>
                    <img src="/images/bag.svg" alt="Shopping List" />
                    {shoppingList.length > 0 && <span>{shoppingList.length}</span>}
                </span>
            </Link>
            <Link to="/menu">
                <span>
                    <img src="/images/menu.png" alt="My Menu" />
                    {menu.length > 0 && <span>{menu.length}</span>}
                </span>
            </Link>
        </StyledNav>
    )
}

export default NavBar