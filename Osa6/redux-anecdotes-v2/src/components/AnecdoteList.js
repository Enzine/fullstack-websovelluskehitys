import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux' 
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  vote = (anecdote) => {
    this.props.voteAnecdote(anecdote)
    this.props.notify(`You voted '${anecdote.content}'`, 5)
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.vote(anecdote) }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotes = (filter, anecdotes) => {
  let anecdotesToShow = filter === null ? anecdotes : anecdotes.filter(a => a.content.includes(filter))
  return anecdotesToShow.sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  console.log("filtteri", state.filter)
  return {
    anecdotesToShow: anecdotes(state.filter, state.anecdotes)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voteAnecdote, notify }
)(AnecdoteList)


export default ConnectedAnecdoteList