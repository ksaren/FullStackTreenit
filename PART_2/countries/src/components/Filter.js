import React from 'react'

const Filter = ({value, handleFilterChange}) => {

    

    return(
        <div>
            Search countries: 
            <input 
            onChange={handleFilterChange}
            value={value}
            />
        </div>

    )
}
    
export default Filter
