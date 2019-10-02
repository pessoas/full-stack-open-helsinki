import React, { useState } from 'react'

export const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-123456' },
        { name: 'Ada Lovelace', phone: '39-44-5323523' },
        { name: 'Dan Abramov', phone: '12-43-234345' },
        { name: 'Mary Poppendieck', phone: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('');

    const [newPhone, setNewPhone] = useState('')

    const [filterName, setNewFilter] = useState('')

    const addNew = (event) => {
        event.preventDefault()
        const contactObject = {
            name: newName,
            phone: newPhone,
        }

        let flag = 0

        persons.forEach((item) => {
            if(item.name.toUpperCase() === newName.toUpperCase()){
                flag++
            }
        })

        if(flag > 0){
            window.alert(`${newName} is already added to phonebook`)
        }else{
            setPersons(persons.concat(contactObject))
            setNewName('')
            setNewPhone('')
        }
        
    }

    const handleNewName = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNewPhone = (event) => {
        console.log(event.target.value)
        setNewPhone(event.target.value)
    }

    const handleFilter = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }
    

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with: <input value={filterName} onChange={handleFilter} />
            </div>

            <h3>Add new contact </h3>

            

            <form onSubmit={addNew}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    number: <input value={newPhone} onChange={handleNewPhone} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h3>Contacts</h3>
                <ShowContacts list={persons} filter={filterName} />
       </div>);
}

const ShowContacts = (props) => {
    //console.log(props.list)
    //console.log(props.filter)
    
    if(!props.filter) {
        const conts = () => props.list.map(content => {
            return <Contact name={content.name} phone={content.phone} key={content.name} />
        })
        return(
            <div> {conts()} </div>
        )
    }else{
        const conts = () => props.list.map(content => {
            if(content.name.toUpperCase().includes(props.filter.toUpperCase())){
                return <Contact name={content.name} phone={content.phone} key={content.name} />
            }else{return <></>}
        })
        return(
            <div> {conts()} </div>
        )
    }
    
}

const Contact = (props) => {
    //console.log(props)
    return (<p>
        {props.name} {props.phone}
    </p>)
}


const ContactForm = ({submit, name, hname, phone, hphone}) => {
    console.log()
    console.log()
    return(
    <form onSubmit={submit}>
        <div>
            name: <input value={name} onChange={hname} />
        </div>
        <div>
            number: <input value={phone} onChange={hphone} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>)
}

export default App

/*
<form onSubmit={addNew}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    number: <input value={newPhone} onChange={handleNewPhone} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>


<ContactForm submit={(e) => addNew(e)} name={(e) => newName(e)} hname={(e) => handleNewName(e)} phone={(e) => newPhone(e)} hphone={(e) => handleNewPhone(e)} />


*/
