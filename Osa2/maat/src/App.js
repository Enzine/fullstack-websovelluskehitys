import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      lands: [],
      landsToShow: [],
      search: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data[0].name)
        this.setState({ lands: response.data })
      })
  }

  handleNewSearchChange = (event) => {
    this.setState({ search: event.target.value })
  }

  updateLandsToShow = (event) => {
    event.preventDefault()
    let newLandsToShow = this.state.lands.filter(land => land.name.toLowerCase().includes(this.state.search))
    
    if (newLandsToShow.length > 10) {
      let tooManyMatches = [{name: 'Got too many matches, please specify another filter.'}]
      this.setState({ landsToShow: tooManyMatches })
    } else if (this.state.search === '') {
      this.setState({ landsToShow: this.state.lands })
    } else {
      this.setState({
        landsToShow: newLandsToShow,
        search: ''
      })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.updateLandsToShow}>
          Find countries: 
          <input
            value={this.state.search}
            onChange={this.handleNewSearchChange}
          />
          <button type='submit'>search</button>      
        </form>

        <ul>
          {this.state.landsToShow.map(land => <li key={land.name}>{land.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default App
