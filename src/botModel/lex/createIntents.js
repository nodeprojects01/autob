var xlsx = require('xlsx')
const fs = require('fs');
const intentConfig = require('./intent-cofig.json')
var slotentry = require('./templates/optinal-slotentry.json')
var intenttemplate = require('./templates/intent-template.json')
var slotInDir = './slots-in/'
var intentOutDir = './intent-out/'
var intentOut = './intent-out/'
var utternaceIn = './utterance-in/'
var intentPrefix="ESS_Gabby_Intent_";
var slotPrefix=""

trainIntent();

function trainIntent() {
  var allSlotArray = {}
  //read excel file from slotInDir which is defined above
  var files = fs.readdirSync(slotInDir);
  files.forEach(slotFile => {
    console.log(slotFile);
    let sData = JSON.parse(fs.readFileSync(slotInDir.concat(slotFile), 'utf-8'));
    let slotValArray = [];
    sData.enumerationValues.forEach(val => {
      console.log('val.value : ', val.value.toLowerCase());
      slotValArray.push(val.value.toLowerCase())
      console.log('val.synonyms : ', val.synonyms);
      val.synonyms.forEach(syn => {
        slotValArray.push(syn.toLowerCase())
      })
    })
    allSlotArray[slotFile] = [...new Set(slotValArray)]
  })
  console.log(JSON.stringify(allSlotArray))
  //create folder if that is not exist
  if (!fs.existsSync(intentOut)) {
    fs.mkdirSync(intentOut);
  }
  var excelfile = fs.readdirSync(utternaceIn);
  console.log(excelfile[0])
  console.log('reading excel file')
  const workbook = xlsx.readFile(`${utternaceIn}${excelfile[0]}`)
  console.log('converting excel to json')
  var sheetList = workbook.SheetNames
  var intentDict = {}
  sheetList.forEach(sheet => {
    console.log('workbook sheet - ' + sheet)
    var utteranceList = xlsx.utils.sheet_to_json(workbook.Sheets[sheet])
    var intentName = intentPrefix+sheet
    console.log(intentName)
    let slotList = intentConfig[intentName];
    console.log('slotList : ############# ', slotList)
    let utteranceDataArray = getUtteraceData(intentName, slotList, utteranceList, allSlotArray)
    let slots = []
    for (i = 0; i < slotList.length; i++) {
      let slot = JSON.parse(JSON.stringify(slotentry));
      slot.name = intentConfig.slotAlias[slotList[i]];
      slot.priority = JSON.parse(JSON.stringify(slot.priority + i));
      slot.slotType = slotList[i];
      slots.push(JSON.parse(JSON.stringify(slot)))
    }
    let intentContent = intenttemplate
    intentContent.name = intentName
    intentContent.sampleUtterances = utteranceDataArray
    intentContent.slots = slots
    intentDict[intentName] = JSON.parse(JSON.stringify(intentContent))
  })
  createIntentFile(intentDict)
  //console.log("Slots synonyms",JSON.stringify(allSlotArray))
}
function createIntentFile(intentDict) {
  console.log(intentDict)
  if (!fs.existsSync(intentOutDir)) {
    fs.mkdirSync(intentOutDir);
  }
  Object.keys(intentDict).forEach((key) => {
    console.log(key, intentDict[key]);
    fs.writeFile(`${intentOutDir}${key}`, JSON.stringify(intentDict[key], null, 4), 'utf8', function (err, result) {
      if (err) console.log('error', err);
    });
  });
  console.log(`\n Please check ${intentOutDir} for the slots. \n `);
}
function getUtteraceData(intentName, slotList, utteranceList, allSlotArray) {
  let utteranceResArray = []
  utteranceList.forEach(u => {
    var tempArrPerUtrnc = [];
    let utrnc = u.Utterance.toLowerCase();
    console.log(utrnc)
    var nextSlot = false;
    slotList.forEach(slotName => {
      console.log('slotName : ---->', slotName)
      var totalMatchArray = [];
      if (tempArrPerUtrnc.length > 0) {
        tempArrPerUtrnc.forEach(utr => {
          let tmp = checkKeyInString(utr, slotName, allSlotArray[slotName])
          totalMatchArray.push(...tmp);
        })
      } else {
        totalMatchArray = checkKeyInString(utrnc, slotName, allSlotArray[slotName])
      }
      console.log("totalMatchArray  :  ", totalMatchArray)
      if (totalMatchArray.length > 0) {
        console.log("setting netSlotvalue True")
        console.log("totalMatchArray : ", totalMatchArray)
        tempArrPerUtrnc = [...totalMatchArray];
        console.log("tempArrPerUtrnc : ", tempArrPerUtrnc)
        nextSlot = true;
      }
    })
    if (tempArrPerUtrnc.length > 0) {
      utteranceResArray.push(...tempArrPerUtrnc);
    }
  });
  utteranceResArray = [...new Set(utteranceResArray)]
  console.log("utteranceResArray : ", utteranceResArray)
  utteranceResArray = utteranceResArray.map(u => {
    let tmp = u.replace(/[^a-z{} _]/gi, ' ').trim();
    tmp = tmp.replace(/\s\s+/g, ' ');
    return tmp;
  })
  console.log("utteranceResArray : ", utteranceResArray)
  utteranceResArray = utteranceResArray.filter(u => {
    return u.length < 200;
  })
  utteranceResArray = [...new Set(utteranceResArray)]
  return utteranceResArray;
}
function checkKeyInString(utterance, slotName, slotSynonymArray) {
  let res = []
  slotSynonymArray.forEach(key => {
    //console.log("Key : "+ key);
    let matchArray = (utterance.match(new RegExp('\\b' + key + '\\b', 'gi')) || [])
    if (matchArray.length > 0) {
      for (i = 0; i < matchArray.length; i++) {
        console.log(utterance, matchArray[i], slotName, i)
        let tmpUtrnce = replaceWithSlotNames(utterance, matchArray[i], slotName, i + 1)
        res.push(tmpUtrnce)
      }
    }
  })
  return res;
}
function replaceWithSlotNames(utrnc, key, slotName, index) {
  let regex = new RegExp('\\b' + key + '\\b', "gi");
  rkey = ` {${intentConfig.slotAlias[slotName]}} `
  var i = 0;
  let res = utrnc.replace(regex, function (match) {
    i += 1;
    if (i === index) { return rkey };
    return match;
  });
  console.log(res)
  return res;
}