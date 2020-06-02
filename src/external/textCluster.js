import axios from 'axios';
import { getExcelData, setExcelData,getSlotValue,setSlotValue,setIntentValue } from '../global/appVariable'

const domain = "http://ec2-18-204-11-37.compute-1.amazonaws.com";

function getIntents(slotValues, inputValues) {
    const path = domain + "/intents";
    // const data = { inputValues: inputValues, slotValues: slotValues, utterances: setExcelData() };
    const data = {
        "botname": "pizza_bot",
        "excel_data": [
            "queen IS Always referred to a godess visit_002@gmail.com",
            "i want to order a pizza",
            "queen is looking like a 5 star godess",
            "queen IS Always referred to a godess visit_002@gmail.com",
            "i want to order a pizza",
            "queen is looking like a 5 star godess",
            "reset my 10 windows password",
            "reset my mac password",
            "queen was once a queen young girl queen",
            "reset my windows password and my id is jinraj_234",
            "a stronger person can become king in any kingdom",
            "reset my system password",
            "reset my ntid",
            "a weeker person cannot become a king because he can be killed anytime",
            "reset my password",
            "reset my machine",
            "king can be killed anytime so we need make him strong",
            "our prince is as strong as rock",
            "prince is a boy will be king",
            "princess is a girl will be queen",
            "queen is looking like a godess",
            "queen was once a young girl",
            "a smart lady can become queen in any kingdom",
            "a intelligent woman can become anything in any kingdom"
        ],
        "adv_settings": {
            "synonyms_generating_type": "custom_synonyms",
            "custom_synonyms": {
                "like": [
                    "like",
                    "refer",
                    "star"
                ],
                "mac": [
                    "mac",
                    "system",
                    "windows"
                ]
            },
            "auto_generate_synonyms_mode": "loose",
            "remove_unimportant_word": [],
            "output_utterances_type": "alphanumeric",
            "each_cluster_min_length": 2,
            "max_utterances_similarity": 0.4,
            "min_utterances_similarity": 0.2
        }
    }
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
    const data = {
        "botname": "pizza_bot",
        "excel_data": [
            "queen IS Always referred to a godess visit_002@gmail.com",
            "i want to order a pizza",
            "queen is looking like a 5 star godess",
            "queen IS Always referred to a godess visit_002@gmail.com",
            "i want to order a pizza",
            "queen is looking like a 5 star godess",
            "reset my 10 windows password",
            "reset my mac password",
            "queen was once a queen young girl queen",
            "reset my windows password and my id is jinraj_234",
            "a stronger person can become king in any kingdom",
            "reset my system password",
            "reset my ntid",
            "a weeker person cannot become a king because he can be killed anytime",
            "reset my password",
            "reset my machine",
            "king can be killed anytime so we need make him strong",
            "our prince is as strong as rock",
            "prince is a boy will be king",
            "princess is a girl will be queen",
            "queen is looking like a godess",
            "queen was once a young girl",
            "a smart lady can become queen in any kingdom",
            "a intelligent woman can become anything in any kingdom"
        ],
        "adv_settings": {
            "synonyms_generating_type": "auto_generate_synonyms",
            "custom_synonyms": {},
            "auto_generate_synonyms_mode": "loose",
            "remove_unimportant_word": [],
            "output_utterances_type": "extract_only_text",
            "each_cluster_min_length": 2,
            "max_utterances_similarity": 0.4,
            "min_utterances_similarity": 0.2
        }
    };//{ inputValues: value, utterances: getExcelData() };
   
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