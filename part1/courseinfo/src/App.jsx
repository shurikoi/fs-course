const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => (
  <>
    {parts.map((part, index) => (
      <p key={index}>
        {part[0]} {part[1]}
      </p>
    ))}
  </>
)

const Total = ({ exercises }) => {
  const sumOfExersises = exercises.reduce(
    (accumulator, number) => (accumulator += number),
    0
  )
  return <p>Number of exercises {sumOfExersises}</p>
}

const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[
          [part1, exercises1],
          [part2, exercises2],
          [part3, exercises3],
        ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App
