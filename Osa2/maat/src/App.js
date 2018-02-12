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
        this.setState({ lands: response.data })
      })
  }

  handleNewSearchChange = (event) => {
    this.setState({ search: event.target.value })
  }

  handleLandsToShowChange = (land) => {
    let newLandsToShow = []
    newLandsToShow = newLandsToShow.push(land)
    console.log(land.name)
    this.setState({ landsToShow: newLandsToShow })
    console.log(Array.isArray(this.state.landsToShow))    
  }

  updateLandsToShow = (event) => {
    event.preventDefault()
    let newLandsToShow = this.state.lands.filter(land => land.name.toLowerCase().includes(this.state.search))

    if (newLandsToShow.length > 10) {
      let tooManyMatches = [{name: 'Got too many matches, please specify another filter.'}]
      this.setState({ landsToShow: tooManyMatches })
    } else {
      this.setState({
        landsToShow: newLandsToShow,
        search: ''
      })
    }
  }

  render() {
    let landsToShow = this.state.landsToShow
    let f = landsToShow.map(land => <li key={land.name} onClick={() => this.handleLandsToShowChange(land)}>{land.name}</li>)
    if (this.state.landsToShow.length === 1) {
      const land = this.state.landsToShow[0]
      f = <div>
            <h2>{land.name}</h2>
            Capital: {land.capital}<br/><br/>
            Population: {land.population}<br/><br/>
            <img src={land.flag} height="120" width="200"></img>
          </div>
    }
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
          {f}
        </ul>
      </div>
    )
  }
}

export default App
