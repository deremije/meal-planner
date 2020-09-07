import React, { useState } from 'react'
import styled from 'styled-components'

const StyledSearchForm = styled.form`
    display: ${props => props.results ? "grid" : "block"};
    grid-template-columns: 1fr 100px;
    position: absolute;
    bottom: 0px;
    transform: ${props => props.results ? "" : "translateY(-50%)"};
    width: calc(100% - 40px);
    margin: 0 20px; 
    padding: ${props => props.results ? "14px 0 10px" : "100% 10px 0"};
    transition: all 300ms linear;
    & input[type="text"] {
        width: ${props => props.results ? "calc(100% - 40px)" : "calc(100% - 30px)"};
        position: relative;
        height: 40px;
        padding: 0 5px;
        margin: 10px 0;
        font-size: 18px;
        transition: all 300ms linear;
    }
    & button {
        width: 100px;
        height: 40px;
        padding: 2px 0;
        background-color: #43AFEC;
        color: #000;
        font-size: 16px;
        margin-top: ${props => props.results ? "12px" : "10px"};
        margin-left: 50%;
        transform: translateX(-50%) translateX(-10px);
        transition: all 300ms linear;
    }
    & button:hover {
        cursor: pointer;
    }
`

const SearchForm = ({ setSearchTerm, results }) => {
  const [searchBar, setSearchBar] = useState('')
  
  const handleSubmit = e => {
    e.preventDefault()
    setSearchTerm(searchBar)
  }

  return (
      <StyledSearchForm results={results} onSubmit={handleSubmit}>
        <input type="text" onChange={e => setSearchBar(e.target.value)} />
        <button type="submit">
          Search
        </button>
      </StyledSearchForm>
  )
}

export default SearchForm;
