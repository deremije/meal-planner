import React, { useState } from 'react'
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

const Ingredient = ({ item, recipeName, recipeURI, shoppingList, setShoppingList }) => {
    const [gotIt, setGotIt] = useState(false)
    const [needIt, setNeedIt] = useState(false)

    const toggleGot = () => {
        if (needIt) alterShoppingList()
        setGotIt(!gotIt)
        setNeedIt(false)
    }

    const toggleNeed = () => {
        alterShoppingList()
        setGotIt(false)
        setNeedIt(!needIt)
    }

    const alterShoppingList = () => {
        if (!needIt) addToShoppingList({item, recipeName, recipeURI})
        if (needIt) removeFromShoppingList({item, recipeName, recipeURI})
    }

    const addToShoppingList = (ingredient) => {
        console.log('adding', ingredient)
        const newList = [...shoppingList, ingredient]
        setShoppingList(newList)
    }

    const removeFromShoppingList = (ingredient) => {
        const newList = [...shoppingList].filter(inList => JSON.stringify(inList) !== JSON.stringify(ingredient))
        setShoppingList(newList)
    }

    return (
        <StyledIngredient>
            <div><span>{item}</span></div>
            <div><img alt="Got It!" onClick={toggleGot} src={gotIt ? "/images/selectedThumb.svg" : "/images/thumb.svg"} /></div>
            <div><img alt="Need It!" onClick={toggleNeed} src={needIt ? "/images/selectedBag.svg" : "/images/bag.svg"} /></div>
        </StyledIngredient>
    )
}

export default Ingredient