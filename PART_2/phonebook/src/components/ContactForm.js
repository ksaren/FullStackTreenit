import React from 'react'

const ContactForm = (props) => {
    return(
        <div>
            <h2>Add new contact:</h2>
            <form onSubmit={props.addContact}>
              <div>
                Name: 
                <input 
                  onChange={props.changeName}
                  value={props.nameValue}
                />
              </div>
              <div>
                Number: 
                <input 
                  onChange={props.changeNumber}
                  value={props.numberValue}
                />
              </div>
              <div>
                <button type="submit">add</button>
              </div>
            </form>
        </div>
    )
}
export default ContactForm
        