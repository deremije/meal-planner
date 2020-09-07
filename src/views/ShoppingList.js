import React from 'react'
import styled from 'styled-components'

const ShoppingList = ( { shoppingList }) => {
    return (
        <div>
            ShoppingList
            {shoppingList.map(item => <div>{item.item}</div>)}
        </div>
    )
}

export default ShoppingList