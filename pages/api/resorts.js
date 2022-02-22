// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'


export default function handler(req, res) {

  const dataDirectory = path.join(process.cwd(), 'data/resorts.json')

  const resorts = JSON.parse(fs.readFileSync(dataDirectory, 'utf8'))

  res.status(200).json(resorts)
}
