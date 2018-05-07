import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => {
    return(
        <button onClick = {handleClick}>
        {text}
        </button>
    )

}

const Statistics = ({state, mean}) => {
    const count = state.num_stats.length
    const positives = () => <em>{(100*state.good.value/count).toFixed(1)}%</em>   
    if (count === 0) {
        return (
            <div>
                <h2>Statistics</h2>
                <em>No ratings yet.</em>
            </div>
        )
    } else {
        return(
            <div>
                <h2>Statistics</h2>
                <table>
                    <Statistic data={state.good} />
                    <Statistic data={state.ok} />
                    <Statistic data={state.bad} />
                    <Statistic data={{text: 'Mean', value: mean.toFixed(1)}} />
                    <Statistic data={{text: 'Positives', value: positives()}} />
                </table>           
            </div>
        )
    }     
}

const Statistic = ({data}) => {
    return (
        <tbody>
            <tr><td>{data.text}</td><td>{data.value}</td></tr>
        </tbody>
    )
}

const Header = ({title}) => {
    return(
    <div>
        <h1>{title}</h1>
    </div>
    )
}



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'How the food tasted? Give your feedback!',
            good: {text: 'Good', value: 0, num:1},
            ok: {text: 'OK', value: 0, num: 0},
            bad: {text: 'Bad', value: 0, num: -1},
            num_stats: [],
        }

    }

        
    addRate = (rate) => () => {
        //console.log(rate)
        this.setState({
            [rate.text.toLowerCase()]: {text: rate.text, value: rate.value + 1, num:rate.num},
            num_stats: this.state.num_stats.concat(rate.num),
        })
    } 
        
    render() {
        const countMean = () => {
            return (
                (this.state.num_stats.reduce((prev,next) => prev + next, 0)/this.state.num_stats.length)
            )
        }

        return(
            <div>
                <Header title={this.state.title}/>
                <div>
                    <Button
                        handleClick = {this.addRate(this.state.good)}
                        text = {this.state.good.text}
                    />
                    <Button
                        handleClick = {this.addRate(this.state.ok)}
                        text = {this.state.ok.text}
                    />
                    <Button
                        handleClick = {this.addRate(this.state.bad)} 
                        text = {this.state.bad.text}
                    />
                </div>

                <Statistics 
                    mean = {countMean()}
                    state={this.state}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
