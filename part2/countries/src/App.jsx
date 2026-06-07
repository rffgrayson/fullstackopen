import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

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

    if (countriesToShow.length > 1) {
      return (
        <ul>
          {countriesToShow.map(country =>
            <li key={country.cca3}>{country.name.common}</li>
          )}
        </ul>
      )
    }

    if (countriesToShow.length === 1) {
      const country = countriesToShow[0]
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages).map(lang =>
              <li key={lang}>{lang}</li>
            )}
          </ul>
          <img src={country.flags.png} alt={`flag of ${country.name.common}`} width={150} />
        </div>
      )
    }

    return <p>No matches</p>
  }

  return (
    <div>
      <div>
        find countries <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
      {renderContent()}
    </div>
  )
}

export default App