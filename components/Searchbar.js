import Autosuggest from 'react-autosuggest'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import Fuse from 'fuse.js'

export default function Searchbar({ resorts, setCurrentResort }) {

    const [value, setValue] = useState('')
    const [suggestion, setSuggestion] = useState([])
    const router = useRouter()
    //const searchRef = useRef()

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
        const fuse = new Fuse(resorts, {
            keys: ['searchName', 'resortName'],
            includeScore: true
        })
        const results = fuse.search(input)
        const resortsResult = results.map(resort => resort.item)
        const singleResort = resortsResult.find(resort => resort.resortName)

        console.log("resortsResult", resortsResult)
        return singleResort
    }


/*     function scrollTo(ref) {
        if (!ref.current) return;
        console.log("scrolling!")
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }
 */
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        const fuse = new Fuse(resorts, {
            keys: ['searchName', 'resortName'],
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
        //scrollTo(searchRef)
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
        <form className="searchbar" onSubmit={(e) => handleSubmit(e)} method="get">
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
    )
}