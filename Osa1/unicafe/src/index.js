import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
      sum: 0,
      count: 0
    }
  }

  clickButton = (value, newCount, newSum) => {
    return () => {
      this.setState({ good: value })
      this.setState({ count: newCount})
      this.setState({ sum: newSum})
    }
  }

  render() {
    return (
      <div>
        <Title name='Palautteenantolomake'/>
        <Button
          handleClick={this.clickButton(this.state.good+1, this.state.count+1, this.state.sum+1)}
          text='upee kaut viis'
        />
        <Button
          handleClick={this.clickButton(this.state.neutral+1, this.state.count+1, this.state.sum)}
          text='ihan jees'
        />
        <Button
          handleClick={this.clickButton(this.state.bad+1, this.state.count+1, this.state.sum-1)}
          text='petyin'
        />
        <Title name='Annetut palautteet'/>
        <Statistics good={this.state.good} neutral={this.state.neutral} bad={this.state.bad} sum={this.state.sum} count={this.state.count}/>
      </div>
    )
  }
}

const Title = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ name, number, ending }) => {
  return (
    <div>
      <p>{name}: {number} {ending}</p>
    </div>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const average = props.sum / props.count
  const positive = good / props.count
  if (!good && !neutral && !bad) {
    return (
      <div>
        <p>Ei vielä annettuja palautteita.</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <tr>
          <td><Statistic name='Hyvät' number={good} ending=''/></td>
        </tr>
        <tr>
          <td><Statistic name='Neutraalit' number={neutral} ending=''/></td>
        </tr>
        <tr>
          <td><Statistic name='Huonot' number={bad} ending=''/></td>
        </tr>
        <tr>
          <td><Statistic name='Suhteellinen keskiarvo' number={average} ending=''/></td>
        </tr>
        <tr>
          <td><Statistic name='Positiivisia' number={positive} ending='%'/></td>
        </tr>
      </tbody>
    </table>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
