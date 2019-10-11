import React from 'react'

const Country = (props) => {
    return(
        <p>
            {props.name}<button onClick={props.showHandler}>show</button>
        </p>
    )
}

export default Country