import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Resort from '../components/Resort'
import Searchbar from './Searchbar'

export default function ResortPage({ resorts, initialResort }) {

    const [currentResort, setCurrentResort] = useState(initialResort)

    return (
        <main className={styles.main}>
            <Resort resort={currentResort} />
            <Searchbar setCurrentResort={setCurrentResort} resorts={resorts}/>
        </main>
    )

}