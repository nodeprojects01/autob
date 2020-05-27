import axios from 'axios';

function getIntents(slotValues,inputValues){
    const path = "/intents";
    const data = {inputValues:inputValues,slotValues:slotValues};

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
    const path = "/slots";
    const data = value;

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