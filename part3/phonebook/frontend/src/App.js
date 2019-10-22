import React, { useState, useEffect } from 'react'


import { ContactsFilter } from './components/ContactsFilter'
import { ContactForm } from './components/ContactForm'
import { Contact } from './components/Contact'
import  SuccessNotification  from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

import contactService from './services/contacts'


export const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filterName, setNewFilter] = useState('')
    const [okMessage, setOkMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        console.log('effect')
        contactService
            .getAll()
            .then(intialContacts => {
                setPersons(intialContacts)
            })
    }, [])
    //console.log(`render ${persons.length} persons`)
    //console.log(persons)

    const addNew = (event) => {
        event.preventDefault()

        if(!newName || !newPhone){
            alert('Name and or number are empty')
        }else{

            const dupl = persons.find(p => p.name.toUpperCase() === newName.toUpperCase())
            console.log(dupl)
            
            if(dupl){
                if(window.confirm('Want to update the contact?')){
                    const contactObject = {
                        name: newName,
                        number: newPhone,
                    }
                    const resultList = persons.filter( p => p.id !== dupl.id)
                    contactService
                        .update(dupl.id, contactObject)
                        .then(returnedContact => {
                            setPersons(resultList.concat(returnedContact))
                            setNewName('')
                            setNewPhone('')
                        })
                        .then(() => {
                            setOkMessage(`Contact ${contactObject.name} updated`)
                            setTimeout(()=>{
                                setOkMessage(null)
                            }, 5000)
                        }) 
                }
            }else{
                const contactObject = {
                    name: newName,
                    number: newPhone,
                }

                contactService
                    .addContact(contactObject)
                    .then(returnedContact => {
                        setPersons(persons.concat(returnedContact))
                        setNewName('')
                        setNewPhone('')
                    })
                    .then(() => {
                        setOkMessage(`Contact ${contactObject.name} succesfully added`)
                        setTimeout(() => {
                            setOkMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        console.log(error.response.data)
                        setErrorMessage(`${error.response.data.error}`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
        }
      
    }
    
    const removeContact = id => {
        console.log(id)
        if(window.confirm('Do you realy want to delete the contact?')){
            const contact = persons.find(p => p.id === id )
            const resultList = persons.filter( p => p.id !== id)
            console.log(contact)
            contactService
                .remove(contact.id)
                .then(returnedContact => {
                    console.log(returnedContact)
                    setPersons(resultList)
                })
                .catch(error => {
                    setErrorMessage(`Information of ${contact.name} has already been removed from server`)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setPersons(persons.filter(n => n.id !== id))
                }) 
        }
    }

    const showContacts = () => {
        //console.log(props.list)
        //console.log(props.filter)
        if (!filterName) {
            const conts = () => persons.map(content => {
                return <Contact name={content.name} phone={content.number} removeContact={()=>removeContact(content.id)} key={content.id} />
            })
            return (<div> {conts()} </div>)
        }
        else {
            const conts = () => persons.map(content => {
                if (content.name.toUpperCase().includes(filterName.toUpperCase())) {
                    console.log(content.id)
                    return <Contact name={content.name} phone={content.number} removeContact={()=>removeContact(content.id)} key={content.id} />;
                }
            })
            return (<div> {conts()} </div>)
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
                <SuccessNotification message={okMessage} />
                <ErrorNotification message={errorMessage} />
                <ContactForm submit={addNew} name={newName} hname={handleNewName} phone={newPhone} hphone={handleNewPhone} />
            
            <h3>Contacts</h3>
                {showContacts()}
                
       </div>);
}

/*
<ShowContacts list={persons} filter={filterName} removeContact={removeContact}/>
*/
export default App

