var inputParams = {};
var excelData = [];
//initializing the values for development purpose
var slots = null;
const defaultSlotValues = {
    "slotsModerate": [
        {
            "value": "actionType",
            "synonyms": ["add", "remove", "register", "signup"]
        },
        {
            "value": "bankNames",
            "synonyms": ["hdfc", "axis", "citi", "indus"]
        },
        {
            "value": "cityNames",
            "synonyms": ["bangalore", "hydrabad", "mumbai", "delhi", "bopal", "ahmadabad"]
        },
        {
            "value": "riverNames2",
            "synonyms": ["ganga", "yamuna", "tunga"]
        }
    ],
    "slotsLoose": [
        {
            "value": "actionType",
            "synonyms": ["add", "remove", "register", "signup"]
        },
        {
            "value": "bankNames",
            "synonyms": ["hdfc", "axis", "citi", "indus"]
        },
        {
            "value": "cityNames",
            "synonyms": ["bangalore", "hydrabad", "mumbai", "delhi", "bopal", "ahmadabad"]
        },
        {
            "value": "riverNames2",
            "synonyms": ["ganga", "yamuna", "tunga"]
        },
        {
            "value": "cityNames1",
            "synonyms": ["bangalore", "hydrabad", "mumbai", "delhi", "bopal", "ahmadabad"]
        },
        {
            "value": "riverNames1",
            "synonyms": ["ganga", "yamuna", "tunga"]
        }
    ],
    "slotsStrict": [
        {
            "value": "actionType",
            "synonyms": ["add", "remove", "register", "signup"]
        },
        {
            "value": "bankNames",
            "synonyms": ["hdfc", "axis", "citi", "indus"]
        }
    ]
}
//initializing the values for development purpose
var intents = "";
var defaultIntents = {
    "greeting": [
        "What is the national animal of Canada?",
        "What is the national animal of Albania?",
        "Which dog used to be sacred in China",
        "Urticaria is a skin disease otherwise known as what?	Hives",
        "What kind of animal is the largest living creature on Earth",
        "Give another name for the study of fossils?	",
        "Which bird can swim but cannot fly?",
        "What do dragonflies prefer to eat",
        "What do you get when you crossbreed a donkey and a horse?",
        "Which insects cannot fly, but can jump higher than 30 cm,What kind of animal is the largest living creature on Earth",
        "What is the name of the European Bison",
        "What is called a fish with a snake-like body?",
        "In which city is the oldest zoo in the world?",
        "After which animals are the Canary Islands named?",
        "Which plant does the Canadian flag contain?",
        "What is the food of penguins?	",
        "Which is the largest species of the tiger?	",
        "The bite of which insect causes the Lyme Disease?	",
        "Which mammal cannot jump?",
        "In which city is the oldest zoo in the world?",
        "After which animals are the Canary Islands named?",
        "Which plant does the Canadian flag contain?",
        "What is the food of penguins?	",
        "Which is the largest species of the tiger?	",
        "The bite of which insect causes the Lyme Disease?	",
        "Which mammal cannot jump?"
    ],
    "C1_0.5_321": [
        "fghjbgunninioliimojomomimgugiunhinhslg",
        "fghjbgunninioliimojomomimgugiunhinhslg",
        "fghjbgunninioliimojomomimgugiunhinhslg",
        "fghjbgunninioliimojomomimgugiunhinhslg",
        "fghjbgunninioliimojomomimgugiunhinhslg",
        "fghjbgunninioliimojomomimgugiunhinhslg",
    ],
    "C2_0.5_3211": [
        "fghjbgunninioliimojomomimgugiunhinhslg",
        "fghjbgunninioliimojomomimgugiunhinhslg",
        "fghjbgunninioliimojomomimgugiunhinhslg",
        "fghjbgunninioliimojomomimgugiunhinhslg",
        "fghjbgunninioliimojomomimgugiunhinhslg",
        "fghjbgunninioliimojomomimgugiunhinhslg",
    ],
    "C3_0.7_321": [
        "What is the national animal of Canada?",
        "What is the national animal of Albania?",
        "Which dog used to be sacred in China",
        "Urticaria is a skin disease otherwise known as what?	Hives",
        "What kind of animal is the largest living creature on Earth",
        "Give another name for the study of fossils?	",
        "Which bird can swim but cannot fly?",
        "What do dragonflies prefer to eat",
        "What do you get when you crossbreed a donkey and a horse?",
        "Which insects cannot fly, but can jump higher than 30 cm,What kind of animal is the largest living creature on Earth",
        "What is the name of the European Bison",
        "What is called a fish with a snake-like body?",
        "In which city is the oldest zoo in the world?",
        "After which animals are the Canary Islands named?",
        "Which plant does the Canadian flag contain?",
        "What is the food of penguins?	",
        "Which is the largest species of the tiger?	",
        "The bite of which insect causes the Lyme Disease?	",
        "Which mammal cannot jump?"
    ]
};

function getInputParams() {
    return inputParams;
}

function setInputParams(data) {
    inputParams = data;
}


function getExcelData() {
    return excelData;
}

function setExcelData(data) {
    excelData = data;
    console.log(excelData)
}

function getSlotValue() {
    return slots;
}

function setSlotValue(data) {
    slots = data;
    console.log(slots)
}

function getIntentValue() {
    return intents
}

function setIntentValue(data) {
    intents = data;
    console.log(intents)
}

module.exports = {
    getExcelData,
    setExcelData,
    getInputParams,
    setInputParams,
    getSlotValue,
    setSlotValue,
    getIntentValue,
    setIntentValue
}
