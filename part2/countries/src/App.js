import React, {useState, useEffect } from 'react';
import axios from 'axios'



const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log(response)
        console.log('promise fulfilled')
        setCountries(response.data)
      })

  }, [])
  //console.log(`render ${countries.length} countries`)

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }



  return(
    <div>
      Find countries: <input value={search} onChange={handleSearch} placeholder='Enter your search here' />
      <ShowCountries list={countries} filter={search} />
    </div>
  )
}

const ShowCountries = (props) => {
  //console.log(props.list)
  if(!props.filter) {
    return <p>Enter your search on the field</p>
  }else{
    const filtered = props.list.filter(content => {
      return content.name.toUpperCase().indexOf(props.filter.toUpperCase()) > -1
    })
    console.log(filtered)
    if ( filtered.length > 9 ){
      return <p>Too many matches, specify another filter</p>
    }else if(filtered.length === 1){
      return <Show select={filtered[0]} />
      /*
      console.log(filtered[0].languages)
      const langs = () => filtered[0].languages.map(content =>{
        return (<Lang name={content.name} key={content.name}/>)
      })
      return(
        <div>
          <h2>{filtered[0].name}</h2>
          <p>Capital: {filtered[0].capital}</p>
          <p>Population: {filtered[0].population}</p>
          <h3>Languages</h3>
          <ul>{langs()}</ul>
          <img src={filtered[0].flag} alt='country flag' height='100' width='100'/>
        </div>
      )*/
      
    }else{
      const counts = () => filtered.map(content => {
        return (
          <Lang name={content.name} key={content.name}/>
        )
      })
      return(<ul>{counts()}</ul>)
    }
  }
}

const Lang = (props) => {
  return(
    <li>{props.name}</li>
  )
}




const Show = ({ select }) => {
  const langs = () => select.languages.map(content =>{
    return (<Lang name={content.name} key={content.name}/>)
  })
  return(
    <div>
        <h2>{select.name}</h2>
        <p>Capital: {select.capital}</p>
        <p>Population: {select.population}</p>
        <h3>Languages</h3>
        <ul>{langs()}</ul>
        <img src={select.flag} alt='country flag' height='100' width='100'/>
    </div>
  )
}


const Button = (props) => {
  return(
    <button type='button' onClick={props.handleClick}>Show</button>
  )
}
export default App;
