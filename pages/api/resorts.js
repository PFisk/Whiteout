// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'


export default function handler(req, res) {

  const dataDirectory = path.join(process.cwd(), 'data/resorts.json')

  const dataTest = {
    "Austria": {
      "name": "Austria",
      "url": "https://www.bergfex.com/oesterreich/schneewerte/",
      "resorts": [
        {
          "resortName": "Abtenau im Lammertal",
          "searchName": "Abtenau im Lammertal",
          "handle": "abtenau-im-lammertal",
          "snowBottom": 50,
          "snowTop": 80,
          "newSnow": null,
          "lifts": 5
        },
      ],
    }
  }

  //const resorts = JSON.parse(fs.readFileSync(dataDirectory, 'utf8'))

  res.status(200).json(dataTest)
}
