import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Ingredient from '../components/Ingredient.js'

const StyledRecipe = styled.div`
    width: calc(100% - 20px);
    height: auto;
    margin: 65px 10px 10px;
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
    width: 100%;
    padding: 5px 0;
    line-height: 30px;
    font-size: 18px;
    background-color: #43AFEC;
    display: block;
    margin: 20px 0;
    transition: all 300ms ease-in-out;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
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


const Recipe = ({ setPageTitle, recipe, menu, setMenu, shoppingList, setShoppingList, gotList, setGotList }) => {
    const [showIngredients, setShowIngredients] = useState(false)
    
    useEffect(() => {
        setPageTitle("Recipe")
    }, [])

    const updateMenu = (recipe) => {
        const newMenu = menu.includes(recipe) ? [...menu].filter(item => JSON.stringify(item) !== JSON.stringify(recipe)) : [...menu, recipe]
        setMenu(newMenu)
    }

    if (recipe.length < 1) return <Redirect to="/" />
    
    return (
        <StyledRecipe>
            <StyledHeroImage image={recipe.recipe.image} />
            <StyledRecipeName>
                {menu.includes(recipe) && <img src="/images/menu.png" alt="Recipe is part of My Menu" />} {recipe.recipe.label}
            </StyledRecipeName>
            <StyledDataPoints>
                {recipe.recipe.totalTime ? <StyledTime>{recipe.recipe.totalTime} minutes</StyledTime> : ''}
                {recipe.recipe.yield ? <StyledServings>Serves {recipe.recipe.yield}</StyledServings> : ''}
                <StyledLabels>
                    {recipe.recipe.dietLabels.map(label => <div key={label}><span style={{"backgroundColor": "#43AFEC"}}></span> {label}</div>)}
                    {recipe.recipe.healthLabels.map(label => <div key={label}><span style={{"backgroundColor": "#3BB004"}}></span> {label}</div>)}
                    {recipe.recipe.cautions.map(label => <div key={label}><span style={{"backgroundColor": "#EC7272"}}></span> {label}</div>)}
                </StyledLabels>
            </StyledDataPoints>
            <StyledAddToMenuButton onClick={() => updateMenu(recipe)}>
                {menu.includes(recipe) ? "Remove from My Menu" : "+ Add to My Menu" }
            </StyledAddToMenuButton>
            <StyledIngredientsList>
                Ingredients ({recipe.recipe.ingredientLines.length}) <span onClick={() => setShowIngredients(!showIngredients)}>{showIngredients ? "HIDE" : "SHOW"}</span>
                {showIngredients && recipe.recipe.ingredientLines.map(ingred => <Ingredient item={ingred} recipeName={recipe.recipe.label} recipeURI={recipe.recipe.uri} key={ingred + recipe.recipe.uri} shoppingList={shoppingList} setShoppingList={setShoppingList} gotList={gotList} setGotList={setGotList} />)}
            </StyledIngredientsList>
            <StyledOutLink>
                <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                    View the full recipe at {recipe.recipe.source}
                </a>
            </StyledOutLink>
        </StyledRecipe> 
    ) 
}

export default Recipe