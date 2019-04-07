import React from 'react'

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Total = ({parts}) => {
  const points = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0);

  return (
    <p>yhteensä {points} tehtävää</p>
  )
}

const Part = ({data}) => {
  return (
    <p>
      {data.name} {data.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, idx) => <Part data={part} key={idx} />)}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </>
  )
}


export default Course;