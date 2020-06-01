
import zip from 'jszip';
import { saveAs } from 'file-saver';
var fs = require("fs")
var slotOutDir = './slots-out/'



function createBotFiles(slots, intents) {
    console.log("slots :", slots);
    console.log("intents :", intents);
    createSlot(slots);
}

function createSlot(slots) {
    var allSlotDict = {}

    for (let [slotName, enumvals] of Object.entries(slots)) {
        console.log(slotName);
        allSlotDict[slotName] = null;
        if (allSlotDict[slotName] == null || allSlotDict[slotName] == undefined) {
            allSlotDict[slotName] = {
                "enumerationValues": enumvals,
                "name": slotName,
                "valueSelectionStrategy": "TOP_RESOLUTION"
            }
        }
    };

    // if (!fs.existsSync(slotOutDir)) {
    //   fs.mkdirSync(slotOutDir);
    // }

    var slotvals = {}
    Object.keys(allSlotDict).forEach((key) => {
        console.log(key, allSlotDict[key]);
        zip.folder("slots").file(key, allSlotDict[key])
        // let tmp = allSlotDict[key].enumerationValues
        // tmp.forEach(val => {
        //     slotvals[val.value] = val.synonyms
        // })
        //   fs.writeFile(`${slotOutDir}${key}`, JSON.stringify(allSlotDict[key], null, 4), 'utf8', function (err, result) {
        //     if (err) console.log('error', err);
        //   });
    });

    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, "example.zip");
        });
    console.log(JSON.stringify(slotvals));
}

export default createBotFiles;