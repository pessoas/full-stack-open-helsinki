import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { ContactsFilter } from './components/ContactsFilter';
import { ContactForm } from './components/ContactForm';
import { ShowContacts } from './components/ShowContacts';



export const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filterName, setNewFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log(`render ${persons.length} persons`)
    console.log(persons)

    const addNew = (event) => {
        event.preventDefault()
        const contactObject = {
            name: newName,
            number: newPhone,
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

                <ContactsFilter filter={filterName} hfilter={handleFilter}/>

            <h3>Add new contact </h3>

                <ContactForm submit={addNew} name={newName} hname={handleNewName} phone={newPhone} hphone={handleNewPhone} />
            
            <h3>Contacts</h3>
            
                <ShowContacts list={persons} filter={filterName} />
       </div>);
}

export default App

