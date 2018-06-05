import React from 'react'

const Person = ({person, buttonHandler}) => {
    return (
        <tr className="contact">
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={buttonHandler} id={person.id}>
                Remove
                </button>
            </td>
        </tr>
    )
}
export default Person