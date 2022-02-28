import fs from 'fs'
import path from 'path'

export default function getData() {

    const dataDirectory = path.join(process.cwd(), 'data/resorts.json')

    const data = JSON.parse(fs.readFileSync(dataDirectory, 'utf8'))
  
    return data
}

export function getResorts() {
    const data = getData()
    return Object.values(data).map(country => {
        return country.resorts.map(resort => {
            return resort
        })
    }).flat()
}

export function getAllResortHandles() {
    const data = getData()
  
    const handles = Object.values(data).map(country => {
      return country.resorts.map(resort => {
        return { params: { id: resort.handle } }
      })
    }).flat()
    return handles
}

export function getResortData(handle) {
  const resorts = getResorts()
  const resortData = Object.values(resorts).find(r => {
    return r.handle === handle
  })
  return { handle, ...resortData }
}