import axios from 'axios';
import { getExcelData,getSlotValue,setSlotValue,setIntentValue } from '../global/appVariable'

const domain = "http://ec2-18-204-11-37.compute-1.amazonaws.com";

function getIntents(value) {
    const data = paramFormatter(value,"intent")
    return new Promise((resolve, reject) => {
        axios.post('/intents', data)
            .then(function (response) {
                if(response.data.status== "400" ){
                    throw(response.data.message)
                }
                setIntentValue(response.data.data.intents)
                resolve();
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function getSlots(value) {
    const data = paramFormatter(value,"slots")
    return new Promise((resolve, reject) => {
        axios.post('/slots', data)
            .then(function (response) {
                console.log(response.data)
                if(response.data.status== "400" ){
                    throw(response.data.message)
                }
                setSlotValue(slotsFormatter(response.data.data.identified_slots))
                resolve();
            })
            .catch(function (error) {
                reject(error);
            });

    });
}

function paramFormatter(value,callApi){
    const [max,min] = value.maxMinLengthCluster.split("/")
    const unimportantWords=value.removeUnimportantWords.split(',')
    var synonymGenerating;
    var custom_synonyms={}
    if(callApi=="intent"){
        synonymGenerating="custom_synonyms"
        var tempArr = getSlotValue()
        tempArr.map((value) => (custom_synonyms[value.value] =value.synonyms));
    }  
    else{
        synonymGenerating=value.synonymGenerating
        custom_synonyms=value.customSynonymsJSON
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
            "each_cluster_min_length":2
        }
    };
    return data
}
function slotsFormatter(slotsObj){
    var slots=[]
    for(let [key, value] of Object.entries(slotsObj)) {
        slots.push({"value":key,"synonyms":value})
      }
    return slots;
}


export {
    getIntents,
    getSlots
}