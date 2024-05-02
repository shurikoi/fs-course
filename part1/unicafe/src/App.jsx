import { useState } from "react"

const Statistics = ({ metrics }) => {
  const { good, neutral, bad } = metrics
  let all = good + neutral + bad
  let average = all / 3
  let positive = (good / all) * 100

  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive ? positive : 0} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  let [good, setGood] = useState(0)
  let [neutral, setNeutral] = useState(0)
  let [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood((good = good + 1))}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics metrics={{ good, neutral, bad }} />
    </>
  )
}

export default App
