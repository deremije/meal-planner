import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import Result from '../components/Result.js'

const StyledSearchResults = styled.div`
    width: calc(100% - 20px);
    height: calc(100% - 130px);
    padding: 10px 10px 0px 10px;
    margin-top: 30px;
    overflow-x: hidden;
    overflow-y: auto;
    p {
        font-size: 18px;
        padding: 0;
        margin: 0;
    }
`



const SearchResults = ({ setPageTitle, results, searchTerm, setRecipe, getMoreRecipes, menu }) => {
    const [fetching, setFetching] = useState(false)
    
    useEffect(() => {
        setFetching(false)
    }, [results])

    useEffect(() => {
        setPageTitle("Search")
    }, [])

    const containerRef = useRef(null)

    const checkPosition = () => {
        if (!fetching && containerRef.current.scrollHeight - (containerRef.current.scrollTop + containerRef.current.clientHeight) < 20) {
            setFetching(true)
            getMoreRecipes(results.length)
        }
    }

    return (
        <StyledSearchResults ref={containerRef} onScroll={checkPosition}>
            {results.map(result => <Link to="/recipe" key={JSON.stringify(result)}><Result setRecipe={setRecipe} result={result}  menu={menu} /></Link>)}
        </StyledSearchResults>
    )
}

export default SearchResults