import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }

  randomizeSelected = (value) => {
    return () => {
    this.setState({ selected: value })
    }
  }

  vote = () => {
    let lol = this.state.votes
    lol[this.state.selected]++
    this.setState({ votes: lol })
  }

  mostVotes = () => {
    let mostVotes = 0
    let mostSelected = 0
    let lol = this.state.votes
    for (let i = 0; i < lol.length; ++i) {
      if (lol[i] > mostVotes) {
        mostVotes = lol[i]
        mostSelected = i
      }
    }
    return (
      <div>
        <p>{this.props.anecdotes[mostSelected]}</p>
          <p>has {mostVotes} votes</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.randomizeSelected(Math.floor(Math.random() * 6))}>
          Satunnainen anekdootti
        </button>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <button onClick={() => this.vote()}>
          Vote!
        </button>
        <p>Ääniä yhteensä {this.state.votes[this.state.selected]}</p>
        <h1>anecdote with most votes:</h1>
        {this.mostVotes()}
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