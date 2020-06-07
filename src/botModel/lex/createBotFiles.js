import { saveAs } from 'file-saver';
import {getInputParams,getSlotValue,getIntentValue } from '../../global/appVariable'
var JSZip = require("jszip");
var zip = new JSZip();

function createBotFiles() { 
    createBot()
    createSlot();
    createIntent();
    zip.generateAsync({ type: "blob" })
    .then(function (content) {
        saveAs(content, "lex_output.zip");
    });
    
}
function createBot(){
    var intentNames=Object.keys(getIntentValue())
    var inputPrams=getInputParams()
    var intents =[]
    intentNames.map((data)=>{
        intents.push({
            "intentName":data,
            "intentVersion":"1"
        })
    })
    var botData={
        "abortStatement": {"messages":[
            {
                "content":"Sorry,I could not understand. Goodbye.",
                "contentType":"PlainText"
            }
        ]},
        "childDirected":false,
        "clarificationPrompt": {
            "maxAttempts":5,
            "messages":[
            {
                "content":"Sorry,can you please repeate that?",
                "contentType":"PlainText"
            }
        ]},
        "idleSessionTTLInSeconds": 300,
        "intents":intents,
        "locale":"en-US",
        "name":inputPrams.botName,
        "voiceId" : "0"
    }
    var filename=""+inputPrams.botName+".json"
    zip.folder("bot").file(filename, JSON.stringify(botData))
}
function createIntent() {
    var allSlotArray = {}
    
    getSlotValue().map((data) => {
        let slotLower =[]
          data.synonyms.map((data)=>{
            slotLower.push(data.toLowerCase())
          })      
          allSlotArray[data.value.toLowerCase()]=slotLower
      });
     
      for (let [intentName, utteranceList] of Object.entries(getIntentValue())) {
        let [utteranceDataArray,slotNamesCount] = getUtteraceData(utteranceList, allSlotArray)
        var slotData=[]
        Object.keys(allSlotArray).map((slotNames)=>{
            if(slotNamesCount[slotNames]!=0){
                slotData.push(
                    {
                        "name":slotNames,
                        "priority":1,
                        "sampleUtterances":[],
                        "slotConstraint":"optional",
                        "slotType":slotNames,
                        "slotTypeVersion":"1"
                    }
                )
            }
            
        })  
        var intentData={
            "name": intentName,
            "sampleUtterances":utteranceDataArray,
            "slots": slotData
        }
        var filename=""+intentName+".json"
        zip.folder("intents").file(filename, JSON.stringify(intentData))
    }; 
}
function getUtteraceData(utteranceList, allSlotArray){
    let utteranceResArray = []
    var slotNamesCount = {}
    
    Object.keys(allSlotArray).map((slotNames)=>{
        slotNamesCount[slotNames]=0
    })    
    utteranceList.map((oneUtterance)=>{
        for (let [slotName, slotSynonymsArray] of Object.entries(allSlotArray)) {
            var onlyOneoccurance=0;
            slotSynonymsArray.map((slotSynonym)=>{
                let matchArray = (oneUtterance.match(new RegExp('\\b' + slotSynonym + '\\b', 'i')) || [])
                if (matchArray.length > 0 && (onlyOneoccurance == 0)){
                    onlyOneoccurance+=1
                    slotNamesCount[slotName] +=1
                    oneUtterance = oneUtterance.replace(new RegExp('\\b' + slotSynonym + '\\b', 'i'),"{"+slotName+"}" ,1);                
                  }           
            })
        }
        utteranceResArray.push(oneUtterance)
    })
    return [utteranceResArray,slotNamesCount]
}

function createSlot() {
    var custom_synonyms = {}
    getSlotValue().map((value) => (custom_synonyms[value.value] = value.synonyms));
    var allSlotDict = {}   
    for (let [slotName, enumvals] of Object.entries(custom_synonyms)) {
        allSlotDict[slotName] = null;
        if (allSlotDict[slotName] == null || allSlotDict[slotName] == undefined) {
            allSlotDict[slotName] = {
                "enumerationValues": enumvals,
                "name": slotName,
                "valueSelectionStrategy": "TOP_RESOLUTION"
            }
        }
    };     
    Object.keys(allSlotDict).forEach((key) => {
        var filename=""+key+".json"
        zip.folder("slots").file(filename, JSON.stringify(allSlotDict[key]))     
    });
}

export default createBotFiles;