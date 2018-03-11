import React from 'react'
import { connect } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

class App extends React.Component {
	componentDidMount () {
		this.props.initAnecdotes()
	}

	render() {
		return (
			<div>
				<h1>Programming anecdotes</h1>
				<Notification />

				<h2>Anecdotes</h2>
				<Filter />
				<AnecdoteList />
				<AnecdoteForm />
			</div>
		)
	}
}

export default connect(
  null, 
  { initAnecdotes }
)(App)