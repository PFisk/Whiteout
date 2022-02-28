const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');

const PORT = 8080;

const app = express();

const dataBF = JSON.parse(fs.readFileSync('./scraper_setup/bfSetup.json').toString());
const dataOTS = JSON.parse(fs.readFileSync('./scraper_setup/otsSetup.json').toString());

const getCountriesBF = async () => {
    const countries = Object.keys(dataBF)

    for (const country of countries) {
        const url = dataBF[country].url;
        const resorts = await getResortsBF(url)
        dataBF[country].resorts = resorts;
        console.log("Done with " + country)
    }
}

const getResortsBF = async (url) => {

    const response = await axios.get(url);

    const html = response.data
    const $ = cheerio.load(html)

    const resorts = []

    $("table tbody tr", html).each(function() {
        const displayName = $(this).find("a").text().replace(/\//g, '-')
        const searchName = normalizeString(displayName)
        const handle = handleizer(searchName).toLowerCase()
        const snowBottom = $(this).find("td").eq(1).text().trim().replace(/\D/g,'')
        const snowTop = $(this).find("td").eq(2).text().trim().replace(/\D/g,'')
        const newSnow = $(this).find("td").eq(3).text().trim().replace(/\D/g,'')
        const lifts = $(this).find("span").text().trim()
        
        resorts.push({
            resortName: displayName,
            searchName: searchName,
            handle: handle,
            snowBottom: snowBottom === "" ? null : parseInt(snowBottom),
            snowTop: snowTop === "" ? null : parseInt(snowTop),
            newSnow: newSnow === "" ? null : parseInt(newSnow),
            lifts: parseInt(lifts)
        })
    })

    return resorts

}

const handleizer = (str) => {
    return str.replace(/(\s-\s)|\s/g, '-').replace(/\./g, '')
}

const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}


const getCountriesOTS = async () => {
    const countries = Object.keys(dataOTS)

    for (const country of countries) {

        const resorts = []

        await Promise.all(dataOTS[country].resorts.map(async (resort) => {
            const url = resort.link
            const response = await getResortOTS(url)
            resorts.push(response)
        }))

        dataOTS[country].resorts = resorts

        console.log("Done with " + country)
    }
}

const getResortOTS = async (url) => {

    const response = await axios.get(url);

    const html = response.data
    const $ = cheerio.load(html)

    let resort = {}

    $(".styles_main__vq2PA", html).each(function () {
        const displayName = $(this).find(".styles_h2__1fsE4").text().trim().replace(/:\D*/g, '').replace(/\//g, '-')
        const searchName = normalizeString(displayName)
        const handle = handleizer(searchName).toLowerCase()
        const newSnow = $(this).find(".styles_text__3kNRt").text().trim().replace(/\D/g, '')
        const snowBottom = $(this).find("[title='Base'] + div .styles_value__ocDGV").text().trim().replace(/\D/g, '')
        const snowTop = $(this).find("[title='Summit'] + div .styles_value__ocDGV").text().trim().replace(/\D/g, '')
        const lifts = $(this).find("[title='Lifts Open'] + div .styles_value__ocDGV").text().trim().replace(/\d*[/]/g, '')

        resort = {
            resortName: displayName,
            searchName: searchName,
            handle: handle,
            newSnow: newSnow === "" ? null : parseInt(newSnow),
            snowBottom: snowBottom === "" ? null : parseInt(snowBottom),
            snowTop: snowTop === "" ? null : parseInt(snowTop),
            lifts: parseInt(lifts)
        }
    })

    return resort

}

const scrape = async () => {
    await getCountriesBF()
    await getCountriesOTS()

    const combinedData = {...dataBF, ...dataOTS}

    fs.writeFile('./data/resorts.json', JSON.stringify(combinedData), "utf-8", function(err) { console.log(err) })
}

scrape()

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
