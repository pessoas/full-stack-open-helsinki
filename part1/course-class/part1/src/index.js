import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/*

const Hello = ({ name, age}) => {
    const bornYear = () => {
        const yearNow = new Date().getFullYear()
        return yearNow - props.age
    }

    const bornYear = () => new Date().getFullYear - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

const App = () => {
    const name = 'Renato'
    const age = 29
    return(
        <div>
            <h1>Greetings</h1>
            <Hello name='Maria' age={10 + 18} />
            <Hello name={name} age={age} />
        </div>
        )
    }


ReactDOM.render(<App />, document.getElementById('root'));

*/

/*
const App = (props) => {
    const [ counter, setCounter ] = useState(0)

    /*
    const setToValue = (value) => {
        return () => {
            setCounter(value)
        }
    }
    

   const setToValue = (value) => () => setCounter(value)

    return (
        <div>
            <Display counter={counter} />
            <Button 
                onClick={setToValue(counter + 1)}
                text='plus'
            />
            <Button 
                onClick={setToValue(counter - 1)}
                text='minus'
            />
            <Button 
                onClick={setToValue(0)}
                text='zero'
            />
        </div>
        
    )
}

*/

/*
const History = (props) => {
    if(props.allClicks.length === 0){
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <div>
            <div>
                {left}
                <Button onClick={handleLeftClick} text='left' />
                <Button onClick={handleRightClick} text='right' />
                {right}
                <History allClicks={allClicks} />
            </div>
        </div>
    )
}
*/

const Display = props => <div>{props.value}</div>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const App = (props) => {
    const [value, setValue] = useState(10)

    const setToValue = (newValue) => () => {
        setValue(newValue)
    }


    return (
        <div>
            <Display value={value} />
            <Button handleClick={setToValue(1000)} text='thousand' />
            <Button handleClick={setToValue(0)} text='zero' />
            <Button handleClick={setToValue(value + 1)} text='increment' />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

