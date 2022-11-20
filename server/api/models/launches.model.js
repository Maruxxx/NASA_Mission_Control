const launches = new Map();

let latestFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('September 21, 2031'),
    target: 'Kepler-442 b',
    customers: ['Marux'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function ifLaunchExists(launchId) {
    return launches.has(launchId)
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++,
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ['Marux'],
        upcoming: true,
        success: true
    }))
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId)
    aborted.upcoming = false;
    aborted.success = false;
    return aborted
}

module.exports = {
    ifLaunchExists,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
}