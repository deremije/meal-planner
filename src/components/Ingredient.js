import React from 'react'
import styled from 'styled-components'

const StyledIngredient = styled.div`
    width: 100%;
    line-height: 24px;
    height: auto;
    padding: 16px 0;
    font-size: 18px;
    display: grid;
    grid-template-columns: 1fr 40px 40px;
    grid-column-gap: 8px;
    div {
        height: 100%;
        position: relative;
        width: auto;
        span {
            display: block;
            text-transform: none;
            font-size: 14px;
            text-align: left;
            width: auto;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        img {
            width: 40px;
            height: 40px;
            display: block;
            margin: auto;
        }
    }

`

const Ingredient = ({ item, recipeName, recipeURI, shoppingList, setShoppingList, gotList, setGotList }) => {
    
    const inBag = () => {
        return shoppingList.filter(inList => inList.item === item && inList.recipeName === recipeName && inList.recipeURI === recipeURI)
    }
    const gotIt = () => {
        return gotList.filter(inList => inList.item === item && inList.recipeName === recipeName && inList.recipeURI === recipeURI)
    }

    const toggleGot = () => {
        if (inBag()) removeFromShoppingList({item, recipeName, recipeURI})
        if (gotIt().length === 0) addToGotList({item, recipeName, recipeURI})
        else removeFromGotList({item, recipeName, recipeURI})
    }

    const toggleNeed = () => {
        if (inBag().length === 0) addToShoppingList({item, recipeName, recipeURI})
        else removeFromShoppingList({item, recipeName, recipeURI})
        if (gotIt()) removeFromGotList({item, recipeName, recipeURI})
    }

    const addToShoppingList = (ingredient) => {
        const newList = [...shoppingList, ingredient]
        setShoppingList(newList)
    }

    const removeFromShoppingList = (ingredient) => {
        const newList = [...shoppingList].filter(inList => JSON.stringify(inList) !== JSON.stringify(ingredient))
        setShoppingList(newList)
    }

    const addToGotList = (ingredient) => {
        const newList = [...gotList, ingredient]
        setGotList(newList)
    }

    const removeFromGotList = (ingredient) => {
        const newList = [...gotList].filter(inList => JSON.stringify(inList) !== JSON.stringify(ingredient))
        setGotList(newList)
    }

    return (
        <StyledIngredient>
            <div><span>{item}</span></div>
            <div><img alt="Got It!" onClick={toggleGot} src={gotIt().length > 0 ? "/images/selectedThumb.svg" : "/images/thumb.svg"} /></div>
            <div><img alt="Need It!" onClick={toggleNeed} src={inBag().length > 0 ? "/images/selectedBag.svg" : "/images/bag.svg"} /></div>
        </StyledIngredient>
    )
}

export default Ingredient