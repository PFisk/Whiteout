import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import ResortPage from '../components/ResortPage'
import styles from '../styles/Home.module.css'
import background from '../public/background.svg'

console.log("env", process.env)

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
      <main className='home-page'>
        <div className='background-wrapper'>
          <Image src={background} alt="Snow" layout={'responsive'} />
        </div>
      </main>
      <div className='search-wrapper'>
        <ResortPage resortData={resortData} />
      </div>
    </div>
  )

}