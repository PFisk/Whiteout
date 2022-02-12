const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');

const PORT = 8080;

const app = express();

const data = {
    "Austria": {
        "name": "Austria",
        "url": "https://www.bergfex.com/oesterreich/schneewerte/",
        "resorts": []
    },
    "Switzerland": {
        "name": "Switzerland",
        "url": "https://www.bergfex.com/schweiz/schneewerte/",
        "resorts": []
    },
    "Germany": {
        "name": "Germany",
        "url": "https://www.bergfex.com/deutschland/schneewerte/",
        "resorts": []
    },
    "Italy": {
        "name": "Italy",
        "url": "https://www.bergfex.com/italien/schneewerte/",
        "resorts": []
    },
    "Slovenia": {
        "name": "Slovenia",
        "url": "https://www.bergfex.com/slovenia/schneewerte/",
        "resorts": []
    },
    "France": {
        "name": "France",
        "url": "https://www.bergfex.com/frankreich/schneewerte/",
        "resorts": []
    },
    "CzechRepublic": { 
        "name": "Czech Republic",
        "url": "https://www.bergfex.com/czechia/schneewerte/",
        "resorts": []
    },
    "Slovakia": {
        "name": "Slovakia",
        "url": "https://www.bergfex.com/slovakia/schneewerte/",
        "resorts": []
    },
    "Spain": {
        "name": "Spain",
        "url": "https://www.bergfex.com/spanien/schneewerte/",
        "resorts": []
    },
    "Liechtenstein": {
        "name": "Liechtenstein",
        "url": "https://www.bergfex.com/liechtenstein/schneewerte/",
        "resorts": []
    },
}

const getCountries = async () => {
    const countries = Object.keys(data)

    for (const country of countries) {
        const url = data[country].url;
        const resorts = await getResorts(url)
        data[country].resorts = resorts;
    }
}

const getResorts = async (url) => {

    const response = await axios.get(url);

    const html = response.data
    const $ = cheerio.load(html)

    const resorts = []

    $("table tbody tr", html).each(function() {
        const resortName = $(this).find("a").text()
        const snowBottom = $(this).find("td").eq(1).text().trim().replace(/\D/g,'')
        const snowTop = $(this).find("td").eq(2).text().trim().replace(/\D/g,'')
        const newSnow = $(this).find("td").eq(3).text().trim().replace(/\D/g,'')
        const lifts = $(this).find("span").text().trim()
        
        resorts.push({
            resortName: resortName,
            snowBottom: snowBottom === "" ? null : parseInt(snowBottom),
            snowTop: snowTop === "" ? null : parseInt(snowTop),
            newSnow: newSnow === "" ? null : parseInt(newSnow),
            lifts: parseInt(lifts)
        })
    })

    return resorts

}

const scrape = async () => {
    await getCountries()
    fs.writeFile('./data/resorts.json', JSON.stringify(data), "utf-8", function(err) { console.log(err) })
}

scrape()

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
