import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const Button = ( {handleClick, text} ) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ( props ) => {  
  if(props.value[0] === 0 && props.value[1] === 0 && props.value[2] === 0 &&props.text === 'good'){
    return (
      <caption>No feedback given</caption>
    )
  }else if(props.value[0] > 0 || props.value[1] > 0 || props.value[2] > 0){

      let sum = (props.value[0] + (props.value[2] * (-1)))
      let all = props.value[0] + props.value[1] + props.value[2]
        
      let average = sum / all
      

      if(props.text === 'average'){
        return(
          <tbody>
            <tr>
              <td>{props.text}</td>
              <td>{average}</td>
            </tr>
          </tbody>
        )
      }else if(props.text === 'positive') {
        return(
          <tbody>
            <tr>
              <td>{props.text}</td>
              <td>{(props.value[0] / all) * 100} %</td>
            </tr>
          </tbody>
        )
      }else if(props.text === 'good'){
        return (
          <tbody>
            <tr>
              <td>{props.text}</td>
              <td>{props.value[0]}</td>
            </tr>
          </tbody>
        )
      }else if(props.text === 'neutral'){
        return (
          <tbody>
            <tr>
              <td>{props.text}</td>
              <td>{props.value[1]}</td>
            </tr>
          </tbody>
        )
    }else if(props.text === 'bad'){
      return (
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value[2]}</td>
          </tr>
        </tbody>
      )
    }
    else if(props.text === 'all'){
      return (
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{all}</td>
          </tr>
        </tbody>
      )
    }
  }else{
  return <></>}
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //const [sum, setSum] = useState([])
  //const [all, setAll] = useState({good: 0, neutral: 0, bad: 0})

  const plusGood = (value) => () => {
    setGood(value + 1)
  }
  const plusNeutral = (value) => () => {
    setNeutral(value + 1)
  }
  const plusBad = (value) => () => {
    setBad(value + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={plusGood(good)} text='good' />
        <Button handleClick={plusNeutral(neutral)} text='neutral' />
        <Button handleClick={plusBad(bad)} text='bad' />
      </div>
      <h2>Statistics</h2>
      <table>
        <Statistics text='good' value={[good, neutral, bad]} />
        <Statistics text='neutral' value={[good, neutral, bad]} />
        <Statistics text='bad' value={[good, neutral, bad]} />
        <Statistics text='all' value={[good, neutral, bad]} />
        <Statistics text='average' value={[good, neutral, bad]} />
        <Statistics text='positive' value={[good, neutral, bad]} />
      </table>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))