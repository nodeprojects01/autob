
export default function getSlots(props) {
  console.log(props);
  console.log(props.autoGenerateSynonymMode)


  // const slotValues; //call API with values
  console.log('call API with values');
  var moderate = [
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

  ]

  var loose = [
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
  ]

  var strict = [
    {
      "value": "actionType",
      "synonyms": ["add", "remove", "register", "signup"]
    },
    {
      "value": "bankNames",
      "synonyms": ["hdfc", "axis", "citi", "indus"]
    }

  ]

  if (props.autoGenerateSynonymMode == 'moderate') {
    return moderate
  }
  else if (props.autoGenerateSynonymMode == 'loose') {
    return loose
  }
  else
    return strict;


}