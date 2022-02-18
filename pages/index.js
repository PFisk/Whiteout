import Head from 'next/head'
import Header from '../components/Header'
import ResortPage from '../components/ResortPage'
import styles from '../styles/Home.module.css'

const resortData = null

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Whiteout</title>
        <meta name="description" content="Snow depths for your local resort" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ResortPage resortData={resortData} />
    </div>
  )

}