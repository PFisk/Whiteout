import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Resort from '../components/Resort'
//import Autosuggest from 'react-autosuggest'
import Fuse from 'fuse.js'

export default function Home() {

  const [data, setData] = useState([])
  const [currentResort, setCurrentResort] = useState(null)
  //const [value, setValue] = useState('')
  //const [suggestion, setSuggestion] = useState([])

  const getData = async () => {
    const response = await fetch('/api/resorts')
    const resorts = await response.json()
    console.log(resorts)
    return resorts
  }

  useEffect(() => {
    getData().then(resorts => setData(resorts))

  }, [])

  const getResorts = () => {
    return Object.values(data).map(country => {
      return country.resorts.map(resort => {
        return resort
      })
    }).flat()
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const fuse = new Fuse(getResorts(), {
      keys: ['resortName'],
      includeScore: true
    })

    const input = e.target.elements.search.value
    const results = fuse.search(input)
    const resortsResult = results.map(resort => resort.item)
    const singleResort = resortsResult.find(resort => resort.resortName)

    if (singleResort) {
      setCurrentResort(singleResort)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Whiteout</title>
        <meta name="description" content="Snow depths for your local resort" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {currentResort &&
          (<Resort resort={currentResort} />)
        }
        <form onSubmit={(e) => handleSubmit(e)} method="get">
          <input className='input-field'
            type="text"
            id="header-search"
            placeholder="Search..."
            name="search"
          />
        </form>
      </main>
    </div>
  )

}


/* 
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const resorts = getResorts()

    console.log("test", resorts)

    return inputLength === 0 ? [] : resorts.filter(resort =>
      resort.resortName.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const getSuggestionValue = suggestion => suggestion.resortName;

  const renderSuggestion = suggestion => (
    <div>
      {suggestion.resortName}
    </div>
  );

  const onChange = (event, { newValue}) => {
    setValue(newValue)
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestion(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestion([])
  }

  const inputProps = {
    placeholder: 'Search for a resort',
    value: value,
    onChange: onChange
  }

          <Autosuggest 
          suggestions={suggestion}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />

 */