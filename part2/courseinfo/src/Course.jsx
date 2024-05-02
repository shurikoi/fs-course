const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </>
)

const Total = ({ parts }) => {
    const sumOfExersises = parts.reduce(
      (accumulator, number) => (accumulator += number.exercises),
      0
    )
    return <b>Total of {sumOfExersises} exercises</b>
  }

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
