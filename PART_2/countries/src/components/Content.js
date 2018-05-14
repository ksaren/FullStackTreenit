import React from 'react'
import Country from './Country'

const Content = ({countries, detailed, handleSingle}) => {
    //countries.map(c => console.log(c))
    //detailed.map(d => console.log(d))
    return(
        countries.length > 10 ?
        <div><em>Too much results to show!</em></div>:
        countries.length > 1 ?
          <div>
            {countries.map(c => 
                detailed.some(d => d === c.name) ?
                <Country 
                    key={c.alpha2Code} 
                    country={c} 
                /> :
                <div onClick={handleSingle}key={c.alpha2Code}>
                <p>{c.name}</p>
                </div>)
            }
          </div>:
            countries.length === 1 ?
            <Country country={countries[0]} />:
              <div><em>No results. Try another query.</em></div>
    )
}

export default Content