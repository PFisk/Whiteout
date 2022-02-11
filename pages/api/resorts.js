// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'

export default function handler(req, res) {

  const resorts = JSON.parse(fs.readFileSync('./data/resorts.json', 'utf8'))

  res.status(200).json(resorts)
}
