import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Ingredient from '../components/Ingredient.js'

const StyledIngredientsList = styled.div`
    width: calc(100% - 20px);
    margin: 75px auto 10px;
    text-align: left;
    h3 {
        font-size: 18px;
        padding: 0;
        margin: 0;
        text-align: left;
    }
`

const ShoppingList = ( { setPageTitle, shoppingList, setShoppingList, gotList, setGotList }) => {
    const [recipeList, setRecipeList] = useState([])
    
    useEffect(() => setPageTitle("Shopping List"), [])
    useEffect(() => {
        const newList = []
        shoppingList.forEach(ingred => {
            if (!newList.includes(ingred.recipeName)) newList.push(ingred.recipeName)
        })
        setRecipeList(newList)
    }, [shoppingList])

    if (shoppingList.length < 1) return <StyledIngredientsList>You have no items on your Shopping List.  Search for a recipe!</StyledIngredientsList>
    return (
        <StyledIngredientsList>
            {recipeList.map(recipe => (
                <div key={recipe}>
                    <h3>{recipe}</h3>
                    {shoppingList.filter(ingred => recipe === ingred.recipeName).map(ingred => <Ingredient item={ingred.item} recipeName={ingred.recipeName} recipeURI={ingred.recipeURI} key={ingred.item + ingred.recipeURI} shoppingList={shoppingList} setShoppingList={setShoppingList} gotList={gotList} setGotList={setGotList} />)}
                </div>
            ))}
        </StyledIngredientsList>
    )
}

export default ShoppingList