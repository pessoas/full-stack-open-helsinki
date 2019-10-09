import React from 'react'
import { Contact } from './Contact'
export const ShowContacts = (props) => {
    //console.log(props.list)
    //console.log(props.filter)
    if (!props.filter) {
        const conts = () => props.list.map(content => {
            return <Contact name={content.name} phone={content.number} removeContact={props.removeContact} key={content.name} />
        })
        return (<div> {conts()} </div>)
    }
    else {
        const conts = () => props.list.map(content => {
            if (content.name.toUpperCase().includes(props.filter.toUpperCase())) {
                return <Contact name={content.name} phone={content.number} removeContact={props.removeContact} key={content.name} />;
            }
        })
        return (<div> {conts()} </div>)
    }
}
