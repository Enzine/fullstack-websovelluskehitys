import React from 'react'
import ReactDOM from 'react-dom'
import Kurssi from './components/Kurssi'

const App = () => {
  const kurssit = [
    {
      id: 1,
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        },
        {
          nimi: 'Gurulasohvilla laiskottelu',
          tehtavia: 1,
          id: 4
        }
      ]
    },
    {
      id: 2,
      nimi: 'Tetristä Mikolle',
      osat: [
        {
          nimi: 'Mikko opettelee pelaamaan',
          tehtavia: 1,
          id: 1
        },
        {
          nimi: 'Mikko opettelee kääntämään molempiin suuntiin',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Reaktor-heijastimien heittelyä',
          tehtavia: 14,
          id: 3
        },
        {
          nimi: 'Gurulasohvilla laiskottelu',
          tehtavia: 1,
          id: 4
        }
      ]
    }
  ]

  return (
    <div>
      {kurssit.map((kurssi) => <Kurssi key={kurssi.id} nimi={kurssi.nimi} osat={kurssi.osat}/>)}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)