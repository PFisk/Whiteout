import Head from 'next/head'
import Header from '../../components/Header'
import ResortPage from '../../components/ResortPage'
import styles from '../../styles/Home.module.css'

const getData = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + '/api/resorts')
  const resorts = await response.json()
  return resorts
}

const getAllResortNames = async () => {
  const resorts = await getData()

  const handles = Object.values(resorts).map(country => {
    return country.resorts.map(resort => {
      return { params: { id: resort.handle } }
    })
  }).flat()
  return handles
}

export async function getStaticPaths() {
  const paths = await getAllResortNames()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const resortData = await getResortData(params.id)
  return {
    props: {
      resortData
    }
  }
}

async function getResortData(handle) {
  const allResorts = await getData()
  const resorts = Object.values(allResorts).map(country => {
    return country.resorts.map(r => {
      return r
    })
  }).flat()

  const resortData = Object.values(resorts).find(r => {
    return r.handle === handle
  })
  console.log('resortData', resortData)
  return { handle, ...resortData }
}

export default function Page({ resortData }) {

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