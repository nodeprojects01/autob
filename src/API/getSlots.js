
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
 
  return new Promise( (resolve, reject) => {
    try{
      
    setTimeout(() => {
      
        if (props.autoGenerateSynonymMode == 'moderate') {
          resolve(moderate);
        }
        else if (props.autoGenerateSynonymMode == 'loose') {
          resolve(loose)
        }
        else
          resolve(strict);
      }
      
      ,1000);}
      catch{
        reject("Error in loading")
      }
   
 });
    
    
}

//Jinraj check if this is the way we will fetch data from API 

// return new Promise( (resolve, reject) => {
//        async function fetchData() {
//             try{
//                  setIsLoading(true)
//                  const response = await window.fetch(/some/API)
//                  const slotValuesData = await response.json()
//                  resolve(slotValuesData)  
//                 }
//               catch{
//                 reject("Error in loading")
//               }
//               finally {//It always execute at the end
//                   setIsLoading(false)   
//                 }  
//           }
//       fetchData()
//     });