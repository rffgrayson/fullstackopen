import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total,setTotal] = useState(0);
  const [average,setAverage] = useState(0);
  const [positive,setPositive] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood)
    setTotal(updatedGood + bad + neutral)
    const updatedTotal = total + 1
    setAverage( (updatedGood - bad) / updatedTotal)
    setPositive( (updatedGood / updatedTotal * 100 ) )
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad)
    setTotal(good + updatedBad + neutral)
    const updatedTotal = total + 1
    setAverage( (good - updatedBad) / updatedTotal)
    setPositive( ( good / updatedTotal) * 100 )
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral)
    setTotal(good + bad + updatedNeutral)
    const updatedTotal = total + 1
    setAverage( (good - bad) / updatedTotal)
    setPositive( ( good / updatedTotal) * 100 )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <h2>statistics</h2>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive} '%'</p>
    </div>
  )
}

export default App