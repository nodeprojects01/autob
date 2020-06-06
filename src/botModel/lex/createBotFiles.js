
// import zip from 'jszip';
import { saveAs } from 'file-saver';
var fs = require("fs")
var slotOutDir = './slots-out/'
var JSZip = require("jszip");
var zip = new JSZip();



function createBotFiles(slots, intents) {
    var custom_synonyms = {}
    slots.map((value) => (custom_synonyms[value.value] = value.synonyms));
    createSlot(custom_synonyms);
    createIntent(intents);
    zip.generateAsync({ type: "blob" })
    .then(function (content) {
        saveAs(content, "example.zip");
    });
    
}
function createIntent(intents) {}

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