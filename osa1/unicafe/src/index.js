import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good+neutral+bad;

  if(total===0) {
    return(
      <div>
        <h1>Statistiikka</h1>
        Ei yhtään palautetta annettu
      </div>
    )
  }

  const avg = (good-bad)/total;
  const pos = Math.floor(good/total*100);

  return (
    <div>
      <h1>Statistiikka</h1>
      <table>
        <tbody>
          <Statistic text="Hyvä" value={good}/>
          <Statistic text="Neutraali" value={neutral}/>
          <Statistic text="Huono" value={bad}/>
          <Statistic text="Yhteensä" value={total}/>
          <Statistic text="Keskiarvo" value={avg}/>
          <Statistic text="Positiivisia" value={pos+' %'}/>
        </tbody>
      </table>
    </div>
  )
}

const Btn = ({clickHandler,text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Btn clickHandler={ () => setGood(good+1) } text="Hyvä"/> &nbsp;
      <Btn clickHandler={ () => setNeutral(neutral+1) } text="Neutraali"/> &nbsp;
      <Btn clickHandler={ () => setBad(bad+1) } text="Huono"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)