
const fs = require('fs');
var slotOutDir = './slots-out/'



function excelToSlots(slots) {
  var allSlotDict = {}

  for (let [slotName, enumvals] of Object.entries(slots)) {
    console.log(slot);
    allSlotDict[slotName];
    if (allSlotDict[slot.name] == null || allSlotDict[slot.name] == undefined) {
      allSlotDict[slot.name] = {
        "enumerationValues": enumvals,
        "name": slot.name,
        "valueSelectionStrategy": "TOP_RESOLUTION"
      }
    }
  };

  if (!fs.existsSync(slotOutDir)) {
    fs.mkdirSync(slotOutDir);
  }

  var slotvals = {}
  Object.keys(allSlotDict).forEach((key) => {
    console.log(key, allSlotDict[key]);
    let tmp = allSlotDict[key].enumerationValues

    tmp.forEach(val => {
      slotvals[val.value] = val.synonyms
    })

    fs.writeFile(`${slotOutDir}${key}`, JSON.stringify(allSlotDict[key], null, 4), 'utf8', function (err, result) {
      if (err) console.log('error', err);
    });
  });

  console.log(JSON.stringify(slotvals));
}