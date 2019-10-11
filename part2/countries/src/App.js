import React, {useState, useEffect } from 'react';
import axios from 'axios'


import Show from './component/Show'

import Country from './component/Country';



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

  const showCountries = () => {
    //console.log(props.list)
    if (!search) {
      return <p>Enter your search on the field</p>
    }
    else {
      const filtered = countries.filter(content => {
        return content.name.toUpperCase().indexOf(search.toUpperCase()) > -1
      })
      console.log(filtered)
      if (filtered.length > 10) {
        return <p>Too many matches, specify another filter</p>
      }
      else if (filtered.length === 1) {
        
        return <Show select={filtered[0]} />
      }
      else {
        const counts = () => filtered.map(content => {
          return (<Country name={content.name} key={content.name} showHandler={()=>showHandler(content)} />)
        })
        return (<ul>{counts()}</ul>);
      }
    }
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const showHandler = (country) => {
    console.log(country)
    setSearch(country.name)
    /*return(
      <Show select={country[0]}/>
    )*/
  }

  return(
    <div>
      Find countries: <input value={search} onChange={handleSearch} placeholder='Enter your search here' />
      {showCountries()}
    </div>
  )
}
//<ShowCountries list={countries} filter={search} />
export default App;
