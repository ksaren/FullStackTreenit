import React from 'react'
import Kurssi from './components/Kurssi'


const App = ({kurssit}) => {    
  
    return (
        <div>
            {kurssit.map(k => <Kurssi key={k.id} kurssi={k} />)}
        </div>
    )  
  }

export default App