import React from 'react'

const Country = ({country}) => {
    let flagText = ('flag of',country.name)
    return(
        <div>
            <h2>{country.name} {country.nativeName}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <img src={country.flag} alt={flagText} width="50%" height="auto"/>

        </div>
    )
}

export default Country