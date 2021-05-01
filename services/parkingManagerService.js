const { rejects } = require('assert');
const http = require('http');
const { resolve } = require('path');
const url = `http://107.21.166.120:8080/`
const axios = require('axios')
var location = require('./locationService');

async function makeCreateNewParking(parking) {
    if (parking.parking.idLocation !== null) {
        var parkingLocation = await location.getById({ id: parking.parking.idLocation });
        if (parkingLocation === null) return null;
    }
    let res = await axios.post(`${url}parking`, parking.parking);
    let data = res.data;
    return data;
}

async function makeCreateNewParkingLoc(parking) {
    var loc = {
        latitude: parking.parking.latitude,
        longitude: parking.parking.longitude
    }

    var newLoc = await location.postLocation(loc)

    delete parking.parking.latitude;
    delete parking.parking.longitude;
    parking.parking.idLocation = newLoc.id;


    let res = await axios.post(`${url}parking`, parking.parking);


    let data = res.data;
    return data;
}

async function makeGetParkingById(id) {
    let res = await axios.get(`${url}parking/${id.id}`);
    let data = res.data
    return data
}

async function makeGetParkings() {
    let res = await axios.get(`${url}parkings`);
    let data = res.data
    return data
}

async function makeDeleteParking(id) {
    let parking = await makeGetParkingById(id);
    if (parking.idLocation !== null) {
        location.deleteLocation({ id: parking.idLocation });
    }
    let res = await axios.delete(`${url}parking/${id.id}`);
    return res.status;
}

async function makeUpdateParking(data) {
    if (data.parking.idLocation !== null) {
        var parkingLocation = await location.getById({ id: data.parking.idLocation });
        if (parkingLocation === null) return null;
    }
    let id = data.id;
    let parking = data.parking
    delete parking.id;
    let res = await axios.put(`${url}parking/${id}`, parking)
    return res.data
}

exports.createNewParking = (parking) => {
    return makeCreateNewParking(parking)
}

exports.createNewParkingLoc = (parking) => {
    return makeCreateNewParkingLoc(parking)
}

exports.getParkingById = (id) => {
    return makeGetParkingById(id)
}

exports.getParkings = () => {
    return makeGetParkings()
}

exports.deleteParking = (id) => {
    return makeDeleteParking(id)
}

exports.updateParking = (data) => {
    return makeUpdateParking(data)
}

