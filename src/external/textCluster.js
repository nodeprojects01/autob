import axios from 'axios';
import { getUtterance, setUtterances } from '../global/appVariable'

const domain = "http://ec2-18-204-11-37.compute-1.amazonaws.com";

function getIntents(slotValues, inputValues) {
    const path = domain + "/intents";
    const data = { inputValues: inputValues, slotValues: slotValues, utterances: getUtterance() };

    return new Promise((resolve, reject) => {
        axios.post(path, data)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function getSlots(value) {
    const path = domain + "slots";
    const data = { inputValues: value, utterances: getUtterance() };
    return new Promise((resolve, reject) => {
        axios.post(path, data)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}


export {
    getIntents,
    getSlots
}