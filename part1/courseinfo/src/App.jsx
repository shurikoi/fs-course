const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => (
  <p>
    {part[0]} {part[1]}
  </p>
)

const Content = ({ parts }) => (
  <>
    {parts.map((part, index) => (
      <Part part={part} key={index} />
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
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[
          [part1.name, part1.exercises],
          [part2.name, part2.exercises],
          [part3.name, part3.exercises],
        ]}
      />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

export default App
