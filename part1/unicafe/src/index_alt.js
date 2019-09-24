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
  if(props.value.length === 0 && props.text === 'good'){
    return (
      <caption>No feedback given</caption>
    )
  }else if(props.value.length > 0){

      let sum = 0
      props.value.forEach(element => {
        sum += element
      })
        
      let average = sum / props.value.length

      let countG = 0
      props.value.forEach(element => {
        if(element === 1){
          countG +=1
        }
      })

      let countN = 0
      props.value.forEach(element => {
        if(element === 0){
          countN +=1
        }
      })

      let countB = 0
      props.value.forEach(element => {
        if(element === -1){
          countB +=1
        }
      })
      

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
              <td>{(countG / props.value.length) * 100} %</td>
            </tr>
          </tbody>
        )
      }else if(props.text === 'good'){
        return (
          <tbody>
            <tr>
              <td>{props.text}</td>
              <td>{countG}</td>
            </tr>
          </tbody>
        )
      }else if(props.text === 'neutral'){
        return (
          <tbody>
            <tr>
              <td>{props.text}</td>
              <td>{countN}</td>
            </tr>
          </tbody>
        )
    }else if(props.text === 'bad'){
      return (
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{countB}</td>
          </tr>
        </tbody>
      )
    }
  }
  return <></>
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState([])
  //const [all, setAll] = useState({good: 0, neutral: 0, bad: 0})

  const plusGood = (value) => () => {
    setGood(value + 1)
    setSum(sum.concat(1))
  }
  const plusNeutral = (value) => () => {
    setNeutral(value + 1)
    setSum(sum.concat(0))
  }
  const plusBad = (value) => () => {
    setBad(value + 1)
    setSum(sum.concat(-1))
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
        <Statistics text='good' value={sum} />
        <Statistics text='neutral' value={sum} />
        <Statistics text='bad' value={sum} />
        <Statistics text='all' value={sum} />
        <Statistics text='average' value={sum} />
        <Statistics text='positive' value={sum} />
      </table>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))