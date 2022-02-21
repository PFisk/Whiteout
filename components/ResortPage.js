import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Resort from '../components/Resort'
import Autosuggest from 'react-autosuggest'
import Fuse from 'fuse.js'
import { useRouter } from 'next/router'

const getData = async () => {
    const response = await fetch(process.env.VERCEL_URL + '/api/resorts')
    const resorts = await response.json()
    return resorts
}

export default function ResortPage({ resortData }) {

    const [data, setData] = useState([])
    const [currentResort, setCurrentResort] = useState(resortData)
    const [value, setValue] = useState('')
    const [suggestion, setSuggestion] = useState([])
    const router = useRouter()

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

        const input = e.target.elements[0].value
        const singleResort = search(input)

        if (!singleResort) {
            return
        }

        if (singleResort) {
            setCurrentResort(singleResort)
        }
        if (input != '') {
            router.push(`/resort/${singleResort?.handle}`)
        }
    }

    const search = (input) => {
        const fuse = new Fuse(getResorts(), {
            keys: ['searchName'],
            includeScore: true
        })
        const results = fuse.search(input)
        const resortsResult = results.map(resort => resort.item)
        const singleResort = resortsResult.find(resort => resort.resortName)

        console.log("resortsResult", resortsResult)
        return singleResort
    }

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        const fuse = new Fuse(getResorts(), {
            keys: ['searchName'],
            includeScore: true
        })

        const results = fuse.search(inputValue)
        const resortsResult = results.map(resort => resort.item)

        return inputLength === 0 ? [] : resortsResult.filter(resort =>
            resort.searchName.toLowerCase().slice(0, inputLength) === inputValue).slice(0, 5);
    };

    const getSuggestionValue = suggestion => suggestion.resortName;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.resortName}
        </div>
    );

    const onChange = (event, { newValue }) => {
        setValue(newValue)
    }

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestion(getSuggestions(value))
    }

    const onSuggestionSelected = (e, { suggestionValue }) => {
        console.log(suggestionValue)
        const singleResort = search(suggestionValue)
        setCurrentResort(singleResort)
        router.push(`/resort/${singleResort.handle}`)
    }

    const onSuggestionsClearRequested = () => {
        setSuggestion([])
    }

    const inputProps = {
        placeholder: 'Search for a resort...',
        value: value,
        onChange: onChange
    }


    return (
        <main className={styles.main}>
            {currentResort &&
                (<Resort resort={currentResort} />)
            }
            <form onSubmit={(e) => handleSubmit(e)} method="get">
                <Autosuggest
                    suggestions={suggestion}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    onSuggestionSelected={onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </form>
        </main>
    )

}