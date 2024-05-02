import { useState } from "react"

const Button = ({ value, onClick }) => <button onClick={onClick}>{value}</button>

const StatisticLine = ({ value, number }) => <p>{value} {number}</p>

const Statistics = ({ metrics }) => {
  const { good, neutral, bad } = metrics
  let all = good + neutral + bad
  let average = all / 3
  let positive = (good / all) * 100

  return (
    <>
      <h1>statistics</h1>
      {!all ? (
        <p>No feedback given</p>
      ) : (
        <>
          <StatisticLine value={"good"} number={good} />
          <StatisticLine value={"neutral"} number={neutral} />
          <StatisticLine value={"bad"} number={bad} />
          <StatisticLine value={"all"} number={all} />
          <StatisticLine value={"average"} number={average} />
          <StatisticLine value={"positive"} number={positive} />
        </>
      )}
    </>
  )
}

const App = () => {
  let [good, setGood] = useState(0)
  let [neutral, setNeutral] = useState(0)
  let [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button value={"good"} onClick={() => setGood(value => value + 1)} />
      <Button value={"neutral"} onClick={() => setNeutral(value => value + 1)} />
      <Button value={"bad"} onClick={() => setBad(value => value + 1)} />

      <Statistics metrics={{ good, neutral, bad }} />
    </>
  )
}

export default App
