const { rejects } = require('assert');
const http = require('http');
const { resolve } = require('path');
const url = `http://107.21.166.120:8080/`
const axios = require('axios')
var location = require('./locationService');
var plu = require('./plu-parkinglotuserService');
var plupl = require('./plu-parkinglotsService');


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
    var pluid = parseInt(parking.parking.idplu)


    var newLoc = await location.postLocation(loc)
    var userplu = await plu.getByIdParkinglotuser({ id: pluid })
    delete parking.parking.latitude;
    delete parking.parking.longitude;
    delete parking.parking.idplu;
    parking.parking.idLocation = newLoc.id;


    let res = await axios.post(`${url}parking`, parking.parking);
    let data = res.data;
    var ParkinglotsInput = {
        parkingid: res.data.id,
        parkinglotuser: userplu
    }

    var resplu = await plupl.postParkinglot({ Parkinglot: ParkinglotsInput })

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

async function setData(data, idx, rawResponse) {
    let obj = {
        id: 0,
        name: "",
        address: "",
        location: {
            longitude: 0.0,
            latitude: 0.0
        }
    }
    const loc = rawResponse.data[idx].idLocation;
    var parkingLocation = await location.getById({ id: loc });
    obj.id = rawResponse.data[idx].id;
    obj.name = rawResponse.data[idx].name;
    obj.address = rawResponse.data[idx].address;
    obj.location.longitude = parkingLocation.longitude;
    obj.location.latitude = parkingLocation.latitude;
    data[idx] = obj;
}

async function makeGetParkingsLocation() {
    let res = await axios.get(`${url}parkings`);
    let data = new Array(res.data.length);

    for (let i = 0; i < res.data.length; i++) {

        await setData(data, i, res);
    }

    return data
}

async function deletePluPL(id) {
    let plures = await plupl.getAllParkinglot();
    for (let i = 0; i < plures.length; i++) {
        if (plures[i].parkingid === id.id) {
            await plupl.deleteParkinglot({ id: plures[i].id });
        }
    }
    
}

async function makeDeleteParking(id) {
    let parking = await makeGetParkingById(id);

    if (parking.idLocation !== null) {
        location.deleteLocation({ id: parking.idLocation });
    }

    deletePluPL(id)

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
exports.getParkingsLocation = () => {
    return makeGetParkingsLocation()
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

