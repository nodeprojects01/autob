var utterances =[];

function getUtterance(){
    return utterances;
}

function setUtterances(data){
    utterances=data;
    console.log(utterances)
}

module.exports = {getUtterance,setUtterances}
