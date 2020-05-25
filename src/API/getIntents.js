import axios from 'axios';
export default function getIntents(slotValues,inputValues) {
  console.log('call getIntent API with values');
    console.log(slotValues);
    console.log(inputValues)
    
    
  
    
  
    
const intentValues = {
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
    "fallback": [
  
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
    ],
    "C4_0.5_321": [],
    "C5_0.5_321": [],
    "C6_0.5_321": [],
    "C7_0.5_321": [],
    "C8_0.5_321": [],
    "C9_0.5_321": [],
    "C10_0.5_321": [],
    "C11_0.5_321": [],
  
  }
  // axios.post('/api', intentValues, { headers: { 'Content-Type': 'application/json', } })
    // axios.post(`/time`,intentValues)
    //     .then(function(response){
    //         console.log(response);
    // })
    // .catch(function(error){
    //     console.log(error);
    // });

    return new Promise( (resolve, reject) => {
                    axios.post(`/time`,{inputValues:inputValues,slotValues:slotValues})
                        .then(function(response){
                            console.log(response.data);
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            });

  //   return new Promise( (resolve, reject) => {
  //     try{
        
  //     setTimeout(() => {
  //       resolve(intentValues)} 
  //       ,1000);}
  //       catch{
  //         reject("Error in loading")
  //       }
     
  //  });
      
      
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