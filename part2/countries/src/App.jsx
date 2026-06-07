import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const countriesToShow = filter === ''
    ? []
    : countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )

  const renderContent = () => {
    if (filter === '') return null

    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

     const countryToShow = countriesToShow.length === 1
      ? countriesToShow[0]
      : selectedCountry

    if (countryToShow) {
      return (
        <div>
          <h1>{countryToShow.name.common}</h1>
          <p>capital {countryToShow.capital[0]}</p>
          <p>area {countryToShow.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(countryToShow.languages).map(lang =>
              <li key={lang}>{lang}</li>
            )}
          </ul>
          <img src={countryToShow.flags.png} alt={`flag of ${countryToShow.name.common}`} width={150} />
        </div>
      )
    }

    if (countriesToShow.length > 1) {
      return (
        <ul>
          {countriesToShow.map(country =>
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>show</button>
            </li>
          )}
        </ul>
      )
    }

    return <p>No matches</p>
  }

  return (
    <div>
      <div>
        find countries <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      {renderContent()}
    </div>
  )
}

export default App