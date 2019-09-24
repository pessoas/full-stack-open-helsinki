import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Anec = (props) => {
  return (
    <p>{props.anec[props.sele]}</p>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(props.anecdotes.length))
  console.log(votes)

  let max = votes.indexOf(Math.max(...votes))

  const upSelected = () => {
    setSelected(Math.floor((Math.random() * 6)))
  }

  const upVotes = (selected, votes) => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVoted = (votes) => {

  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anec anec={props.anecdotes} sele={selected}/>
      <div>
        <Button handleClick={() => upVotes(selected, votes)} text={'vote'} />
        <Button handleClick={upSelected} text={'next anecdote'} />
      </div>
      <h2>Anecdote with most votes</h2>
      <Anec anec={props.anecdotes} sele={max} /> has {votes[max]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)