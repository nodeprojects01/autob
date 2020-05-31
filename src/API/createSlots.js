


var xlsx = require('xlsx')
const fs = require('fs');
var slotInDir = './slots-in/'
var excelOutDir = './excel-out/'
var slotOutDir = './slots-out/'
var excelInDir = './excel-in/'

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Hey there, Please select option below : \n 1. Create Excel file from Slots JSON files. \n 2. Create Slots JSON file from Excel. \n Your choice is : ', option => {
  console.log(`You have selected : ${option}`);
  if (option == 1) {
    slotsToExcel();
  } else if (option == 2) {
    excelToSlots();
  } else {
    console.log(`Sorry thats an incorrect oprion, Please retry..`);
  }
  readline.close();
});

function slotsToExcel() {
  var resArry = []
  var files = fs.readdirSync(slotInDir);
  files.forEach(file => {
    console.log(file);
    let sData = JSON.parse(fs.readFileSync(slotInDir.concat(file), 'utf-8'));
    let tempArry = sData.enumerationValues.map(s => {
      let returnValue = {
        name: sData.name,
        value: s.value,
        synonyms: JSON.stringify(s.synonyms)
      };
      return returnValue
    })
   resArry = resArry.concat(tempArry)
  })
  console.log(resArry)

  if (!fs.existsSync(excelOutDir)) {
    fs.mkdirSync(excelOutDir);
  }
  console.log('responseArr length is', resArry.length)
  const fileName = `${excelOutDir}AllSlots.xlsx`;
  const ws = xlsx.utils.json_to_sheet(resArry);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'All slots');
  xlsx.writeFile(wb, fileName);
  console.log(`\n Please check ${excelOutDir}AllSlots.xlsx for the output. \n `);

}

function excelToSlots() {
  var excelfile = fs.readdirSync(excelInDir);
  console.log(excelfile[0])
  console.log('reading excel file')
  const workbook = xlsx.readFile(`${excelInDir}${excelfile[0]}`)
  console.log('converting excel to json')
  var sheetList = workbook.SheetNames
  console.log('workbook sheet - ' + sheetList[0])
  var allSlotJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheetList[0]])
  var allSlotDict = {}

  allSlotJson.forEach(slot => {
    console.log(slot);
    var enumObj = {}
    if (slot.synonyms == null || slot.synonyms == "") {
      enumObj = {
       value: slot.value
      }
    } else {
      enumObj = {
        value: slot.value,
        synonyms: JSON.parse(slot.synonyms)
      }
    }

    if (allSlotDict[slot.name] == null || allSlotDict[slot.name] == undefined) {
      allSlotDict[slot.name] = {
        "enumerationValues": [
          enumObj
        ],
        "name": slot.name,
        "valueSelectionStrategy": "TOP_RESOLUTION"
      }
    } else {
      allSlotDict[slot.name].enumerationValues.push(enumObj)
    }
  });

  if (!fs.existsSync(slotOutDir)) {
    fs.mkdirSync(slotOutDir);
  }

  var slotvals ={} 
  Object.keys(allSlotDict).forEach((key) => {
    console.log(key, allSlotDict[key]);
    let tmp=allSlotDict[key].enumerationValues

    tmp.forEach(val=>{
      slotvals[val.value]=val.synonyms
    })

    fs.writeFile(`${slotOutDir}${key}`, JSON.stringify(allSlotDict[key], null, 4), 'utf8', function (err, result) {
     if (err) console.log('error', err);
    });

  });

  console.log(JSON.stringify(slotvals))
  console.log(`\n Please check ${slotOutDir} for the slots. \n `);

}