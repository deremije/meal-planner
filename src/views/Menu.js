import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import Result from '../components/Result.js'

const StyledMenu = styled.div`
    width: calc(100% - 20px);
    height: calc(100% - 140px);
    padding: 40px 10px 10px;
    margin-top: ${props => props.menu.length > 0 ? "" : "25px"};
    overflow-x: hidden;
    overflow-y: auto;
    p {
        font-size: 14px;
        padding: 0;
        margin: 0 0 5px 0;
        text-align: center;
    }

`

const Menu = ({ setPageTitle, menu, setRecipe, shoppingList }) => {
    useEffect(() => {
        setPageTitle("My Menu")
    }, [])

    const listItems = (result) => shoppingList.map(ingredient => ingredient.recipeURI === result.recipe.uri).length

    if (menu.length < 1) return <StyledMenu menu={menu}>You have no recipes in your menu.  Search for a new recipe!</StyledMenu>
    return (
        <StyledMenu menu={menu}>
            {menu.map(result => (
                <div>
                    <Link to="/recipe" key={JSON.stringify(result)}>
                        <Result setRecipe={setRecipe} result={result}  menu={menu} />
                    </Link>
                    {listItems(result) > 0 && <p>{listItems(result)} item{listItems(result) > 1 ? "s" : ""} for {result.recipe.label} in your <Link to="/list">Shopping List</Link>.</p>}
                    <p><a href={result.recipe.url} target="_blank" rel="noopener noreferrer">View the full recipe at {result.recipe.source}</a></p>
                </div>
            ))}
        </StyledMenu>
    )
}

export default Menu