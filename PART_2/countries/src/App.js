import React, { Component } from 'react';
import axios from 'axios'
import Filter from './components/Filter';
import Content from './components/Content'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      detailedCountries: [],
      showThese: ''
    }
  }
    
  componentDidMount() {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      this.setState({ countries: response.data })
    })
  }

  handleRestrictions = (event) => {
    this.setState({
      showThese: event.target.value,
      detailedCountries: []
    })
  }

  handleSingle = (event) => {
    //console.log(event.target.innerText)
    return(
    this.setState({
      detailedCountries: this.state.detailedCountries.concat(event.target.innerText)
    })
  )
  }

  countriesToShow = (countries) => {
    return(
      countries.filter(
        c => c.name
        .toLowerCase()
        .includes(this.state.showThese.toLowerCase())
        )
    )
     
  }

  render() {     
    return (
      <div>
          <h1>Countries</h1>
          <Filter 
            handleFilterChange={this.handleRestrictions}
            value={this.state.showThese}
          />
          <Content 
            handleSingle={this.handleSingle}
            detailed={this.state.detailedCountries}
            countries={this.countriesToShow(this.state.countries)} 
          />       
      </div>
    )
  }
}

export default App
