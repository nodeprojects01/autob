import axios from 'axios';
import { getExcelData, getSlotValue, setSlotValue, getInputParams, setIntentValue, getIntentValue } from '../global/appVariable'

function getIntents() {
    const data = paramFormatter("intent");
    console.log("getIntents() - ", data);
    return new Promise((resolve, reject) => {
        axios.post('/intents', data)
            .then(function (response) {
                if (response.data.status == "400") {
                    reject(response.data.message);
                }
                setIntentValue(response.data.data.intents)
                resolve();
            })
            .catch(function (error) {
                reject(error.message);
            });
    });
}

function getSlots() {
    const data = paramFormatter("slots");
    console.log("getSlots() - ", data);
    return new Promise((resolve, reject) => {
        
            axios.post('/slots', data)
            .then(function (response) {
                console.log(response.data)
                if (response.data.status == "400") {
                    reject(response.data.message);
                }
                setSlotValue(slotsFormatter(response.data.data.identified_slots))
                resolve();
            })
            .catch(function (error) {
                reject(error.message);
            });
    });
}

function paramFormatter(callApi) {
    var value = getInputParams();
    const [max, min] = value.maxMinLengthCluster.split("/")
    const unimportantWords = value.removeUnimportantWords.split(',')
    var synonymGenerating;
    var tempArr = getSlotValue()
    var custom_synonyms = {}
    if ((callApi == "intent") && (tempArr.length > 0)) {
        synonymGenerating = "custom_synonyms"
        tempArr.map((value) => (custom_synonyms[value.value] = value.synonyms));
    }
    else {
        synonymGenerating = value.synonymGenerating
        custom_synonyms = value.customSynonymsJSON
    }

    const data = {
        "botname": value.botName,
        "excel_data": getExcelData(),
        "adv_settings": {
            "synonyms_generating_type": synonymGenerating,
            "custom_synonyms": custom_synonyms,
            "auto_generate_synonyms_mode": value.autoGenerateSynonymMode,
            "remove_unimportant_word": unimportantWords,
            "output_utterances_type": value.outputUtterance,
            "max_utterances_similarity": parseFloat(max),
            "min_utterances_similarity": parseFloat(min),
            "each_cluster_min_length": value.eachClusterMinCount
        }
    };
    return data
}
function slotsFormatter(slotsObj) {
    var slots = []
    for (let [key, value] of Object.entries(slotsObj)) {
        slots.push({ "value": key, "synonyms": value })
    }
    return slots;
}


export {
    getIntents,
    getSlots
}