import React, {useEffect, useState} from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"

import SearchForm from './views/SearchForm.js'
import SearchResults from './views/SearchResults.js'
import Recipe from './views/Recipe.js'
import ShoppingList from './views/ShoppingList.js'
import Menu from './views/Menu.js'
import NavBar from './components/NavBar.js'
import styled from 'styled-components'

const StyledContainer = styled.div`
  font-family: "Roboto", sans-serif;
  width: 100vw;
  height: 100vh;
  max-height: 896px;
  max-width: 414px;
  border-bottom: solid 1px #CCC;
  border-right: solid 1px #CCC;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #eee;
  position: relative;
  display: block;
  margin: auto;
`

const App = () => {
  const [searchTerm, setSearchTerm] = useState(null)
  const [results, setResults] = useState(null)
  const [recipe, setRecipe] = useState([])
  const [menu, setMenu] = useState([])
  const [shoppingList, setShoppingList] = useState([])
  const [gotList, setGotList] = useState([])
  const [pageTitle, setPageTitle] = useState("Search")
  
  const APP_ID = "ca6309c7"
  const APP_KEY = "749a2a1bbb37412141cf0dd5b7976632"
  

  

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    console.log(data)
    setResults([...data.hits])
  }

  useEffect(() => {
    if (searchTerm) getRecipes()
  }, [searchTerm])

  const getMoreRecipes = async (displayedRecipes) => {
    const response = await fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=${displayedRecipes + 10}`)
    const data = await response.json()
    const newResults = [...data.hits]
    setResults(newResults)
  }

  return (
    <StyledContainer>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} results={results} />
            {results && <SearchResults setPageTitle={setPageTitle} results={results} searchTerm={searchTerm} setRecipe={setRecipe} getMoreRecipes={getMoreRecipes} menu={menu} />}
          </Route>
          <Route path="/list">
            <ShoppingList setPageTitle={setPageTitle} shoppingList={shoppingList} setShoppingList={setShoppingList} gotList={gotList} setGotList={setGotList} />
          </Route>
          <Route path="/recipe">
            <Recipe setPageTitle={setPageTitle} recipe={recipe} setShoppingList={setShoppingList} menu={menu} setMenu={setMenu} shoppingList={shoppingList} gotList={gotList} setGotList={setGotList} />
          </Route>
          <Route path="/menu">
            <Menu setPageTitle={setPageTitle} menu={menu} setRecipe={setRecipe} shoppingList={shoppingList} />
          </Route>
        </Switch>
        <NavBar pageTitle={pageTitle} menu={menu} setRecipe={setRecipe} shoppingList={shoppingList} />
        
      </BrowserRouter>
    </StyledContainer>
  )
}

export default App;
