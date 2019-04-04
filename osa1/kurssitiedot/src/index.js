import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
	return (
		<h1>{props.course}</h1>
	)
}

const Total = (props) => {
	return (
		<p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>	
	)
}

const Part = (props) => {
	return (
	  <p>
         {props.data.name} {props.data.exercises}
      </p>	
	)
}

const Content = (props) => {
	return (
	<div>
		<Part data={props.parts[0]}/>
		<Part data={props.parts[1]}/>
		<Part data={props.parts[2]}/>
	</div>
	)
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
	  <Header course={course.name} />
	  <Content parts={course.parts} />
	  <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
