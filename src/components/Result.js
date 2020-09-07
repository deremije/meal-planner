import React from 'react'
import styled from 'styled-components'

const HeroImage = styled.div`
    width: 100%;
    height: 140px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
`

const Icon = styled.img`
    height: 18px;
    width: auto;
    margin: 2px 3px;
`

const InfoBar = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    display: grid;
    grid-template-columns: 60px 60px 1fr;
    grid-row-gap: 4px;
    font-size: 18px;
    line-height: 22px;
    * {
        vertical-align: top;
    }
`
const RecipeLabel = styled.div`
    grid-column: 3;
    grid-row: 1 / span 2;
    text-align: right;
    img {
        height: 16px;
        width: auto;
        margin-right: 3px;
        margin-top: 3px;
    }
`

const Labels = styled.div`
    grid-column: 1 / span 2;
    grid-row: 2;
    display: flex;
    justify-content: flex-start;
    div {
        margin-right: 5px;
        width: 18px;
        height: 18px;
        margin-top: 2px;
    }
`

const StyledResult = styled.div`
    width: 100%;
    margin: 30px 0;
`

const Result = ({ result, setRecipe, menu }) => {
    return (
        <StyledResult onClick={() => setRecipe(result.recipe)}>
            <HeroImage image={result.recipe.image} />
            <InfoBar>
                {result.recipe.yield ?
                    <div>
                        <Icon alt="Servings" src="/images/bowl.png" />{result.recipe.yield}    
                    </div> :
                    <div></div>
                }
                {result.recipe.totalTime ? 
                    <div>
                        <Icon alt="Total Time" src="/images/clock.png" />{result.recipe.totalTime}    
                    </div> : 
                    <div></div>
                } 
                <RecipeLabel>
                    {menu.includes(result.recipe) && <img src="/images/menu.png" alt="Recipe is part of My Menu" />} {result.recipe.label}
                </RecipeLabel>
                <Labels>
                    {result.recipe.dietLabels.length > 0 ? 
                        <div style={{ "backgroundColor": "#43AFEC"}}></div> : ""
                    }
                    {result.recipe.healthLabels.length > 0 ? 
                        <div style={{ "backgroundColor": "#3BB004"}}></div> : ""
                    }
                    {result.recipe.cautions.length > 0 ? 
                        <div style={{ "backgroundColor": "#EC7272"}}></div> : ""
                    }
                </Labels>
            </InfoBar>
            
            
        </StyledResult>
    )
}

export default Result