import React from 'react'

const Filter = ({value, handleFilterChange}) => {

    

    return(
        <div>
            Filter results: 
            <input 
            onChange={handleFilterChange}
            value={value}
            />
        </div>

    )
}
    
export default Filter
