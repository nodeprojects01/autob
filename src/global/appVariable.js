var utterances =[];
var slots;
var intents;

function getUtterance(){
    return utterances;
}

function setUtterances(data){
    utterances=data;
    console.log(utterances)
}

function getSlots(){
    return slots;
}

function setSlots(data){
    utterances=data;
    console.log(slots)
}

function getIntents(){
    return intents;
}

function setIntents(data){
    utterances=data;
    console.log(intents)
}

module.exports = {
    getUtterance,
    setUtterances,
    getSlots,
    setSlots,
    getIntents,
    setIntents
}
