import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    e.persist()

    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.anecdoteCreation(content)

    this.props.notify(`A new anecdote '${content}' was created`, 5)
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

const mapDispatchToProps = {
  anecdoteCreation,
  notify
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps,
)(AnecdoteForm)

export default ConnectedAnecdoteForm
