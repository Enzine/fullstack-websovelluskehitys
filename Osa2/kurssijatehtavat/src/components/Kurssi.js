import React from 'react'

const Kurssi = (kurssi) => {
  return (
    <div>
      <Otsikko nimi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat}/>
    </div>
  )
}

const Otsikko = (kurssi) => {
  return (
    <div>
      <h1>{kurssi.nimi}</h1>
    </div>
  )
}

const Sisalto = (kurssi) => {
  return (
    <div>
      {kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
    </div>
  )
}

const Osa = (kurssi) => {
  return (
    <div>
      <p>{kurssi.osa.nimi} {kurssi.osa.tehtavia}</p>
    </div>
  )
}

const Yhteensa = (kurssi) => {
  return (
    <div>
      <p>yhteensä {kurssi.osat.reduce( (akkumulaattori, osa) => osa.tehtavia + akkumulaattori, 0 )} tehtävää</p>
    </div>
  )
}

export default Kurssi