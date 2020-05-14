import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract_1.jpg'
import TextField from '@material-ui/core/TextField';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { appStyle, appTheme } from '../../styles/global';
import { Button } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

}));
const ChipTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: `50px `,
      },
    },
  },
})(TextField);
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: appStyle.colorBlueGreyDark,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: appStyle.colorBlueGreyDark,
    },
    '& .MuiOutlinedInput-root': {
      // '& fieldset': {
      //   borderColor: appStyle.colorBlueGreyDark,
      // },
      '&:hover fieldset': {
        borderColor: appStyle.colorBlueGreyDark,
      },
      '&.Mui-focused fieldset': {
        borderColor: appStyle.colorBlueGreyDark,
      },
    },
  },
})(TextField);
const StyledListItem = withStyles({
  root: {
    backgroundColor: "white",
    borderRadius: '5px',

    '& .Mui-selected': {
      backgroundColor: "grey"
    }
  },

})(ListItem);
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

const myCustomeInput = {
  "helloIntent": ["hey", "hi", "hello", "hiiiiiiiii", "heyyyyyyyyyyyy"],
  "byeIntent": ["b", "by", "bye", "byee", "byeee"],
  "goodIntent": ["good", "bettter", "best", "happy", "smile"],
  "hateIntent": ["worst", "bad", "sad", "kill"]
}



export default function Slots() {
  const classes = useStyles();

  const [inputUtterance, setInputUtterance] = React.useState(intentValues);
  console.log(inputUtterance);
  const property = 'helloIntent';
  
  const [keyName, setKeyName] = React.useState(Object.keys(inputUtterance)[0]);
  const [keyValue, setKeyValue] = React.useState()
  console.log(inputUtterance[keyName]);

  const [mergeKeyName,setmergeKeyName]=React.useState('');

  useEffect(() => {
    setKeyValue(JSON.stringify(Object.values(inputUtterance[keyName]), null, " ").replace(/(\[)?(\])?(\")?(\')?/g, ""))
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target
    console.log(name, "+", value);
      if(name==="MergeIntent")
      {
        setmergeKeyName(value)
      }
      else{
        setKeyValue(value);
        const updatedValue = (value.replace(/(\n)?/g, '').split(','))
        setInputUtterance({ ...inputUtterance, [name]: updatedValue })
      }
    
  }


  const mergeIntent = (e) =>{
    const { name, value } = e.target
    console.log(name, "+", value);
    if(e.keyCode == 13) {  
      const updatedValue = (inputUtterance[keyName] +"," +inputUtterance[value]).split(',');
      setInputUtterance({...inputUtterance,[keyName]:updatedValue,[value] :''})


      // const deleteIntentKey =[value];
      // setInputUtterance(Object.fromEntries(
      //   Object.entries(inputUtterance).filter(
      //      ([key, val])=>!deleteIntentKey.includes(key)
      //   )
      // ));
    }
    
  } 

  const deleteIntent = (e) =>{

    const deleteIntentKey =[keyName];

    var position = Object.keys(inputUtterance).indexOf(keyName);
    (parseInt(position)>0)?(position=parseInt(position)-1):(position=parseInt(position)+1)
    const updatedKeyName = Object.keys(inputUtterance)[position]
    setKeyName(updatedKeyName)
    
        

    setInputUtterance(Object.fromEntries(
      Object.entries(inputUtterance).filter(
         ([key, val])=>!deleteIntentKey.includes(key)
      )
    ));
    
  }


  return (

    <Grid container style={{
      // backgroundColor: "#4F5457" 
      backgroundImage: `url(${image1})`,
      height: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      padding: "3em 0 0 0",
    }}>
      <Box display="flex" justifyContent="flex-end" style={{ width: "100%" }}>
        <Box style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "32px 0 0 0",
          minHeight: "100%",
          width: "96%",
          textAlign: "left"
          // boxShadow:"rgb(68, 105, 123, 0.6) -7px -5px 15px"
        }}>

          <Grid item xs={12}>
            <div style={{ padding: "1.7em 2em", height: "80vh" }}>
              <div>
                <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Identify Intents</Typography>
              </div>

              <div style={{ margin: "2em 2em" }}>
                <Grid container justify="left" spacing={2} style={{ height: '100%' }}>


                  <Grid item xs={3}>
                    <List style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                      {Object.keys(inputUtterance).map((text) => (
                        <StyledListItem button key={text} divider={1}
                          onClick={() => {setKeyName(text)}}>
                          <ListItemText primary={text} />
                        </StyledListItem>
                      ))}

                    </List>
                  </Grid>

                  <Grid item xs={9} >

                    <Grid container xs={12}>
                      <Grid xs={10}>
                        <CssTextField id="outlined-full-width"
                          placeholder=""
                          fullWidth
                          name="intentName"
                          value={keyName}
                          InputProps={{
                            style: appTheme.textDefault,
                            readOnly: true,
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <Button variant="outlined" justify="center"  onClick={deleteIntent}>Delete</Button>
                      </Grid>

                    </Grid>
                    <br></br>

                    <Grid xs={12} container spacing={2} >
                      <Grid xs={6}  >

                        <div >
                          <ChipTextField
                            placeholder="IntentName to merge"
                            name="MergeIntent"
                            value={mergeKeyName}
                            variant="outlined"
                            onChange={handleInputChange}
                            onKeyDown={mergeIntent}
                          />
                        </div>


                      </Grid>
                      <Grid xs={6} >

                        <div>
                          <ChipTextField
                            placeholder=""
                            name=""
                            variant="outlined"
                          />
                        </div>
                      </Grid>

                    </Grid>
                    <br></br>
                    <Grid xd={12} >
                     
                         <div>           
                            <CssTextField id="outlined-multiline-static"
                              fullWidth
                              multiline
                              rows={20}
                              value={keyValue}
                              margin="dense"
                              InputProps={{
                                style: appTheme.textDefault
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                              name={keyName}
                              onChange={handleInputChange}

                            />
                          </div>  
                    </Grid>


                  </Grid>

                </Grid>
                <br></br>
                <Grid xs={12} container  justify="right" >
                      
                        <Button variant="outlined"  onClick={()=>{window.location.reload(); }}>Reset</Button>
                     
                </Grid>
              </div>
            </div>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
