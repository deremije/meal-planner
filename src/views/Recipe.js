import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Ingredient from '../components/Ingredient.js'

const StyledRecipe = styled.div`
    width: calc(100% - 20px);
    height: auto;
    margin: 10px;
    overflow-y: auto;
`
const StyledHeroImage = styled.div`
    width: 100%;
    height: 200px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
`
const StyledRecipeName = styled.div`
    font-size: 24px;
    line-height: 32px;
    img {
        height: 18px;
        width: auto;
        margin-right: 5px;
    }
`
const StyledDataPoints = styled.div`
    width: 100%;
    line-height: 32px;
    font-size: 18px;
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
`
const StyledServings = styled.div`
    text-align: right;
    grid-column: 2;
`
const StyledTime = styled.div`
    text-align: left;
    grid-column: 1;
`
const StyledLabels = styled.div`
    text-align: left;
    grid-column: 1 / span 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    div {
        span {
            display: inline-block;
            height: 18px;
            width: 18px;
            margin-right: 3px;
            vertical-align: middle;
            margin-top: -5px;
        }
    }

`
const StyledAddToMenuButton = styled.button`
    width: auto;
    padding: 5px;
    line-height: 30px;
    font-size: 18px;
    background-color: #43AFEC;
    display: block;
    margin: ${props => props.showButton ? "20px 0" : ""};
    transition: all 300ms ease-in-out;
    position: relative;
    left: 50%;
    transform: ${props => props.showButton ? "translateX(-50%)" : "scaleY(0)"};
`
const StyledIngredientsList = styled.div`
    font-size: 24px;
    line-height: 32px;
    width: 100%;
    text-align: left;
    span {
        color: #1016AC;
        font-size: 12px;
        text-transform: uppercase;
        display: inline-block;
        margin-top: -3px;
        position: relative;
        vertical-align: middle;
    }
`
const StyledOutLink = styled.div`
    font-size: 14px;
    text-align: center;
    padding: 20px 0 40px;
`


const Recipe = ({ recipe, menu, setMenu, shoppingList, setShoppingList, gotList, setGotList }) => {
    const [showIngredients, setShowIngredients] = useState(false)
    
    const addToMenu = (recipe) => {
        const newMenu = [...menu, recipe]
        setMenu(newMenu)
    }

    if (recipe.length < 1) return <Redirect to="/" />
    
    return (
        <StyledRecipe>
            <StyledHeroImage image={recipe.image} />
            <StyledRecipeName>
                {menu.includes(recipe) && <img src="/images/menu.png" alt="Recipe is part of My Menu" />} {recipe.label}
            </StyledRecipeName>
            <StyledDataPoints>
                {recipe.totalTime ? <StyledTime>{recipe.totalTime} minutes</StyledTime> : ''}
                {recipe.yield ? <StyledServings>Serves {recipe.yield}</StyledServings> : ''}
                <StyledLabels>
                    {recipe.dietLabels.map(label => <div key={label}><span style={{"backgroundColor": "#43AFEC"}}></span> {label}</div>)}
                    {recipe.healthLabels.map(label => <div key={label}><span style={{"backgroundColor": "#3BB004"}}></span> {label}</div>)}
                    {recipe.cautions.map(label => <div key={label}><span style={{"backgroundColor": "#EC7272"}}></span> {label}</div>)}
                </StyledLabels>
            </StyledDataPoints>
            <StyledAddToMenuButton showButton={!menu.includes(recipe)} onClick={() => addToMenu(recipe)}>
                + Add to My Menu
            </StyledAddToMenuButton>
            <StyledIngredientsList>
                Ingredients ({recipe.ingredientLines.length}) <span onClick={() => setShowIngredients(!showIngredients)}>{showIngredients ? "HIDE" : "SHOW"}</span>
                {showIngredients && recipe.ingredientLines.map(ingred => <Ingredient item={ingred} recipeName={recipe.label} recipeURI={recipe.uri} key={ingred + recipe.uri} shoppingList={shoppingList} setShoppingList={setShoppingList} gotList={gotList} setGotList={setGotList} />)}
            </StyledIngredientsList>
            <StyledOutLink>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                    View the full recipe at {recipe.source}
                </a>
            </StyledOutLink>
        </StyledRecipe> 
    ) 
}

export default Recipe