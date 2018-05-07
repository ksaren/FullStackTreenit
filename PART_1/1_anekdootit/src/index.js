import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
    return(
        <button onClick = {handleClick}>
        {text}
        </button>
    )

}

const Anecdote = ({text, points}) => {
    return(
        <div>
            <p><i>{text}</i></p>
            <p>This anecdote has {points} points.</p>
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: {},
    }
    for (let i=0; i<this.props.anecdotes.length; i++) {
        this.state.points[i] = 0
    }
  }

    pickNextAnecdote = (limit) => () => {
        this.setState({selected: Math.floor(Math.random()*limit)})
    }

    vote = () => () => {
        const newPoints = {...this.state.points}
        newPoints[this.state.selected] += 1
        return(
            this.setState({points: newPoints})
        )
    }

  
  render() {


    const bestAnecdote = () => {
        let bestKey = 0
        let bestValue = 0
        for(let key in this.state.points) {
            if(this.state.points[key] > bestValue) {
                bestKey = key
                bestValue = this.state.points[key]
            }
        }
        return bestKey
    }

    return (
      <div>
        <Anecdote 
            text={this.props.anecdotes[this.state.selected]}
            points={this.state.points[this.state.selected]}
        />
        <Button 
            text='vote'
            handleClick={this.vote()}
        />
        <Button 
            text='Next anecdote'
            handleClick={this.pickNextAnecdote(this.props.anecdotes.length)}
        />
        <p>Most voted anecdote:</p>
        <Anecdote 
            text={this.props.anecdotes[bestAnecdote()]}
            points={this.state.points[bestAnecdote()]}
        />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
