// Modules that we are using in this project.
const {parse} = require('csv-parse');
const path = require('path')
const fs = require('fs');

// Array for collecting data from steam.
const planets = require('./planets.schema')

// Filtering function to arrange habitable planets on an array of objects.
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}


function loadPlanetsData() {

    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'cumulative_2022.11.14_17.37.43.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', (c) => {
            if (isHabitablePlanet(c)) {
                return savePlanet(c)
            }
        })
        .on('error', (err) => reject(err))
        .on('end', async () => {
            const countHabitablePlanets = (await getAllPlanets()).length
            console.log(`${countHabitablePlanets} Habitable planets found!`)
            resolve();
        });
        
    })
}


function getAllPlanets() {
    return planets.find({})
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true,
        })
    } catch(err) {
        console.error(err)
    }
}


module.exports = {
    loadPlanetsData,
    getAllPlanets,

}

