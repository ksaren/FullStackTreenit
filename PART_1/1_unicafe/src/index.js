import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => {
    return(
        <button onClick = {handleClick}>
        {text}
        </button>
    )

}

const Statistics = ({state, count}) => {

    const positives = () => {
        if (count === 0) {
            return (
                <div>
                   <em>No ratings yet.</em>
                </div>
            )
        }
        return (
            <div>
                <p>Positive: {(100*state.good/count).toFixed(1)}%</p>
            </div>
        )
    }

    return(
        <div>
            <h2>Statistics</h2>
            <p>Good: {state.good}</p>
            <p>Sometimes OK: {state.ok}</p>
            <p>Bad: {state.bad}</p>
            <p>Mean: {state.mean.toFixed(1)}</p>
            {positives()}
        </div>
    )
    
}

const Statistic = ({}) => {

}

const Header = ({title}) => {
    return(
    <div>
        <h1>{title}</h1>
    </div>
    )
}



class App extends React.Component {
    constructor() {
        super()
        this.state = {
            title: 'How did the food taste like? Give your feedback!',
            good: 0,
            ok: 0,
            bad: 0,
            num_stats: [],
            mean: 0
        }

    }

    countMean = () => this.state.num_stats.reduce((prev,next) => prev + next, 0)/this.state.num_stats.length
    
        
    addGood = () => () => {
        const m = this.countMean()
        this.setState({
            good: this.state.good + 1,
            num_stats: this.state.num_stats.concat(1),
            mean: m
        })
    } 
    addOK = () => () => {
        const m = this.countMean()
        this.setState({
            ok: this.state.ok + 1,
            num_stats: this.state.num_stats.concat(0),
            mean: m
        })
    }
    addBad = () => () => {
        const m = this.countMean()
        this.setState({
            bad: this.state.bad + 1,
            num_stats: this.state.num_stats.concat(-1),
            mean: m
        })
    }       
    
    render() {
        return(
            <div>
                <Header title={this.state.title}/>
                <div>
                    <Button
                        handleClick = {this.addGood()}
                        text = 'Good' 
                    />
                    <Button
                        handleClick = {this.addOK()}
                        text = 'OK, sometimes' 
                    />
                    <Button
                        handleClick = {this.addBad()}
                        text = 'Bad' 
                    />
                </div>

                <Statistics 
                    state={this.state}
                    count={this.state.num_stats.length}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
