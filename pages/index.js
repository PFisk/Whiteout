import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import ResortPage from '../components/ResortPage'
import styles from '../styles/Home.module.css'
import background from '../public/background.svg'
import { getResorts } from '../lib/resorts'

export async function getStaticProps() {
  const resorts = getResorts()
  return {
      props: {
          resorts
      }
  }
}

export default function Home( { resorts } ) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Whiteout</title>
        <meta name="description" content="Snow depths for your local resort" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='home-page'>
      </main>
      <div className='search-wrapper'>
        <ResortPage resorts={resorts} />
      </div>
    </div>
  )

}