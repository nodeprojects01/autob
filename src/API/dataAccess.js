import axios from 'axios';

function getIntents(){
    const path = "/intents";
    const data = "";

    return new Promise((resolve, reject) => {
        axios.post(path, data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function getSlots(){
    const path = "/slots";
    const data = "";

    return new Promise((resolve, reject) => {
        axios.post(path, data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}


module.exports = {
    getIntents,
    getSlots
}