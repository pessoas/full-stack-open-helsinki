import React from 'react'

export const Course = (props) => {
    return (<div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </div>);
}

const Header = (props) => {
    return (<h1>{props.course}</h1>);
}

const Content = (props) => {
    console.log(props);
    const rows = () => props.parts.map(content => {
        console.log(content);
        return <Part name={content.name} exercises={content.exercises} key={content.id} />
    })

    return (<div>
        {rows()}
    </div>);
}

const Total = (props) => {
    const sum = props.parts.reduce((acc, cur) => {
        return acc + cur.exercises;
    }, 0);
    console.log(sum);
    return (<p>
        Number of exercises {sum}
    </p>);
}

const Part = (props) => {
    //console.log(props)
    return (<p>
        {props.name} {props.exercises}
    </p>);
}
