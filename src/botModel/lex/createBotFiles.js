
// import zip from 'jszip';
import { saveAs } from 'file-saver';
var JSZip = require("jszip");
var zip = new JSZip();
var intentPrefix="ESS_Gabby_Intent_";



function createBotFiles(slots, intents) {
    var custom_synonyms = {}
    slots.map((value) => (custom_synonyms[value.value] = value.synonyms));
    createSlot(custom_synonyms);
    createIntent(slots,intents);
    zip.generateAsync({ type: "blob" })
    .then(function (content) {
        saveAs(content, "lex_output.zip");
    });
    
}
function createIntent(slots,intents) {
    var allSlotArray = {}
    
    slots.map((data) => {
        let slotLower =[]
          data.synonyms.map((data)=>{
            slotLower.push(data.toLowerCase())
          })      
          allSlotArray[data.value.toLowerCase()]=slotLower
      });
     
      for (let [name, utteranceList] of Object.entries(intents)) {
        var intentName=intentPrefix+name
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

function createSlot(slots) {
    var allSlotDict = {}   
    for (let [slotName, enumvals] of Object.entries(slots)) {
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