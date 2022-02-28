import Head from 'next/head'
import Header from '../../components/Header'
import ResortPage from '../../components/ResortPage'
import styles from '../../styles/Home.module.css'
import { getAllResortHandles, getResortData, getResorts } from '../../lib/resorts'


export async function getStaticPaths() {
  const paths = await getAllResortHandles()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const resortData = await getResortData(params.id)
  const resorts = getResorts()
  return {
    props: {
      resortData,
      resorts
    }
  }
}

export default function Page({ resortData, resorts }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Whiteout</title>
        <meta name="description" content="Snow depths for your local resort" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ResortPage resortData={resortData} resorts={resorts} initialResort={resortData} />
    </div>
  )

}