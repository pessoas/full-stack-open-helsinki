import React from 'react';
export const Contact = (props) => {
    //console.log(props)
    return (
    <p>
        {props.name} {props.phone} <button onClick={props.removeContact}>delete</button>
    </p>
    )
}
