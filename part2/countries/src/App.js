import React, {useState, useEffect } from 'react';
import axios from 'axios'
import { ShowCountries } from './component/ShowCountries';



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

export default App;
