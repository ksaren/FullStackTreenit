import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
    
    render() {
        const {name, age} = this.props
        const bornYear = () => 1900 + new Date().getYear() - age
        return (
            <div>
                <p>Hello {name}!</p>
                <p>You're {age} years old.</p>
                <p>Did you born on {bornYear()}?</p>
    
            </div>
        )
    }
    
}

const DidYouKnow = () => {
    const a = Math.round(Math.random()*10);
    const b = Math.round(Math.random()*10);
    return (
        <p>Did you know that {a.toString()} + {b.toString()} is {a+b}?</p>
    )
}

const Display = ({counter}) => <div>Counter: {counter}</div>

const Button = ({handleClick, text}) => {
    return (
    <button onClick={handleClick}>
        {text}
    </button>
    )

}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 1,
            vasen: 1,
            oikea: 1,
            kaikki: []
        }
     
    }  
    now = new Date();
    firstname = "Kaisa";
    lastname = "Saren";
    age = 34;

    klikVasen = () => {
        this.setState({
          vasen: this.state.vasen + 1,
          kaikki: this.state.kaikki.concat('v')

        })
      }
    
    klikOikea = () => {
        this.setState({
          oikea: this.state.oikea + 1,
          kaikki: this.state.kaikki.concat('o')

        })
      }

    asetaArvoon = (arvo) => () => this.setState({ counter: arvo })
    

    render() {
        const historia = () => {
            if (this.state.kaikki.length === 0) {
            return (
              <div>
                <em>sovellusta käytetään nappeja painelemalla</em>
              </div>
            )
          }
          return (
            <div>
              näppäilyhistoria: {this.state.kaikki.join(' ')}
            </div>
          )
        }
        return(
        <div>
            <h1>Greetings</h1>
            <Hello 
            name = {this.firstname+" "+this.lastname} 
            age = {this.age}
            />
            <Display counter={this.state.counter}/>
            <div>{historia()}</div>
            <div>
                {this.state.vasen} 
                <button onClick={this.klikVasen}>vasen</button>
                <button onClick={this.klikOikea}>oikea</button>
                {this.state.oikea}
            </div>
            <Button
                handleClick={this.asetaArvoon(this.state.counter + 1)}
                text='Plus' 
            />
            <Button
                handleClick={this.asetaArvoon(this.state.counter - 1)}
                text="Minus"
            />
            <Button
                handleClick={this.asetaArvoon(0)}
                text='Zero'
            />

            <h2>About math</h2>
            <DidYouKnow />
            <DidYouKnow />
            <p>It's {this.now.toDateString()}</p>
        </div>    
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
