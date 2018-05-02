import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => {
    return(
        <button onClick = {handleClick}>
        {text}
        </button>
    )

}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            Good: 0,
            OK: 0,
            Bad: 0,
        }

    }
        

    addGood = () => () => this.setState({Good: this.state.Good + 1})
    addOK = () => () => this.setState({OK: this.state.OK + 1})
    addBad = () => () => this.setState({Bad: this.state.Bad + 1})

    
    render() {
        return(
            <div>
                <h1>How did the food taste like? Give your feedback!</h1>

                <div>
                    <Button
                    handleClick = {this.addGood()}
                    text = 'Good' 
                    />
                    <Button
                    handleClick = {this.addOK()}
                    text = 'OK' 
                    />
                    <Button
                    handleClick = {this.addBad()}
                    text = 'Bad' 
                    />
                </div>

                <h2>Statistics</h2>
                <div>
                    <p>Good: {this.state.Good}</p>
                    <p>OK: {this.state.OK}</p>
                    <p>Bad: {this.state.Bad}</p>
                </div>
            </div>

        )

    }
}

ReactDOM.render(<App />, document.getElementById('root'));
