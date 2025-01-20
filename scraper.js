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

    $("table tbody tr", html).each(function () {
        const displayName = $(this).find("a").text().replace(/\//g, '-')
        const searchName = normalizeString(displayName)
        const handle = handleizer(searchName).toLowerCase()
        const snowBottom = $(this).find("td").eq(1).text().trim().replace(/\D/g, '')
        const snowTop = $(this).find("td").eq(2).text().trim().replace(/\D/g, '')
        const newSnow = $(this).find("td").eq(3).text().trim().replace(/\D/g, '')
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

const getCountriesOTSnew = async () => {
    const countries = Object.keys(dataOTS)

    for (const country of countries) {
        const url = dataOTS[country].url;
        const resorts = await getResortsOTS(url)
        dataOTS[country].resorts = resorts;
        console.log("Done with " + country)
    }
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

const getResortsOTS = async (url) => {

    const response = await axios.get(url);

    const html = response.data
    const $ = cheerio.load(html)
    const tableRows = $('tbody > tr.styles_row__HA9Yq');

    const resorts = []

    tableRows.each((_, row) => {
        const displayName = $(row).find('td a.styles_titleCell__5wNFE span.h4').text().trim();
        const searchName = normalizeString(displayName)
        const handle = handleizer(searchName).toLowerCase()
        const newSnow = $(row).find('td:nth-child(2) span.h4').text().trim().replace(/\D/g, '');
        const snowDepth = $(row).find('td:nth-child(3) span.h4').text().trim();
        const lifts = $(row).find('td:nth-child(5) span.h4').text().trim().split("/")[1];

        let snowBottom;
        let snowTop;

        if (snowDepth.includes("-")) {
            const snow = snowDepth.split("-");
            snowBottom = snow[0];
            snowTop = snow[1].replace(/\D/g, '');
        } else {
            snowBottom = 0;
            snowTop = snowDepth.replace(/\D/g, '');
        }

        resorts.push({
            resortName: displayName,
            searchName: searchName,
            handle: handle,
            newSnow: newSnow === "" ? null : parseInt(newSnow),
            snowBottom: snowBottom === "" ? null : parseInt(snowBottom),
            snowTop: snowTop === "" ? null : parseInt(snowTop),
            lifts: parseInt(lifts)

        });
    })

    return resorts

}

const scrape = async () => {
    await getCountriesBF()
    await getCountriesOTSnew()

    const combinedData = { ...dataBF, ...dataOTS }

    fs.writeFile('./data/resorts.json', JSON.stringify(combinedData), "utf-8", function (err) { console.log(err) })

    console.log("All done!")
}

scrape()