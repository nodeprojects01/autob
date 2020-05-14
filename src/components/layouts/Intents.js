import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract.jpg'
import TextField from '@material-ui/core/TextField';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { appStyle, appTheme } from '../../styles/global';
import { Button } from '@material-ui/core';
import SnackBarComponent from '../SnackbarComponent';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
      borderRadius:"20px"
    }
  },
  root: {
    flexGrow: 1,
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
// const ChipTextField = withStyles({
//   root: {
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderRadius: `50px `,
//       },
//     },
//   },
// })(TextField);
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
    // backgroundColor: appStyle.colorGreyLight,
    borderRadius: '2em',
    border: "1px solid",
    borderColor: "rgba(0, 0, 0, 0.2)",
    margin: "5px 0",
    padding: "4px 15px",

    '& .Mui-selected': {
      backgroundColor: "grey"
    },

    '& .MuiTypography-body1': {
      fontSize: appStyle.fontSizeDefault,
      color: appStyle.colorOffBlack
    }
  },

})(ListItem);

const StyledButton = withStyles({
  root: appTheme.buttonDefault,
  label: {
      textTransform: 'capitalize',
  },
})(Button);

const arrayToString = (arr) => {
  return arr.toString().replace(/,/g, "\n");
}

const strToArray = (str) => {
  return str.replace(/(?:\r\n|\r|\n)/g, ',').split(',');
}

export default function Slots() {
  const classes = useStyles();
  const originalDataset = intentValues;
  const [clusterData, setClusterData] = React.useState(intentValues);
  const [selectedClusterName, setSelectedClusterName] = React.useState(Object.keys(clusterData)[0]);
  const [mergeKeyName, setmergeKeyName] = React.useState('');

  //Error Handling Snackbar
  const [snackBar, setSnackBar] = useState({ type: "error", show: false, message: "" });
  const handleCloseSnackBar = () => {
    setSnackBar({ type: "error", show: false, message: "" })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    console.log(name, "+", value);
    if (name === "MergeIntent") {
      setmergeKeyName(value)
    }
    else {
      const updatedValue = strToArray(value);
      setClusterData({ ...clusterData, [name]: updatedValue })
    }

  }

  const mergeIntent = (e) => {
    const { name, value } = e.target
    if (e.keyCode == 13) {
      if ((value in clusterData)) {
        const updatedValue = (clusterData[selectedClusterName] + "," + clusterData[value]).split(',');
        setClusterData({ ...clusterData, [selectedClusterName]: updatedValue, [value]: '' })
        setSnackBar({ type: "success", show: true, message: "Merge successfull" });
      }
      else {
        setSnackBar({ type: "error", show: true, message: "Please enter correct Intent" });
      }

      // const deleteIntentKey =[value];
      // setClusterData(Object.fromEntries(
      //   Object.entries(clusterData).filter(
      //      ([key, val])=>!deleteIntentKey.includes(key)
      //   )
      // ));
    }

  }

  const deleteIntent = (e) => {

    if (window.confirm('Are you sure you want to delete?')) {
      const deleteIntentKey = [selectedClusterName];

      var position = Object.keys(clusterData).indexOf(selectedClusterName);
      (parseInt(position) > 0) ? (position = parseInt(position) - 1) : (position = parseInt(position) + 1)
      const updatedKeyName = Object.keys(clusterData)[position]
      setSelectedClusterName(updatedKeyName)


      setClusterData(Object.fromEntries(
        Object.entries(clusterData).filter(
          ([key, val]) => !deleteIntentKey.includes(key)
        )
      ));
    }

  }

  const slotValues = [
    {
      "value": "action",
      "synonyms": ["add", "remove", "register", "signup"]
    },
    {
      "value": "bank",
      "synonyms": ["hdfc", "axis", "citi", "indus"]
    },
    {
      "value": "action",
      "synonyms": ["add", "remove", "register", "signup"]
    },
    {
      "value": "bank",
      "synonyms": ["hdfc", "axis", "citi", "indus"]
    }
  ]
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
                <Grid container spacing={2}>
                  <Grid item xs={3} >
                    <div style={{ background: "#FFF", padding: "1em" }}>
                      <List style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                        {Object.keys(clusterData).map((clusterName) => (
                          <StyledListItem button key={clusterName} divider={1}
                            style={selectedClusterName == clusterName ? { background: "rgb(235, 112, 119, 0.5)", color: "#fff" } : {}}
                            onClick={() => { setSelectedClusterName(clusterName) }}>
                            <ListItemText primary={clusterName} />
                          </StyledListItem>
                        ))}

                      </List>
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <div style={{ background: "#FFF", padding: "1em" }}>
                      <Grid xs={12} container spacing={1} >
                        <Grid item md={6} lg={6}>
                          <CssTextField id="outlined-full-width"
                            placeholder=""
                            fullWidth
                            margin="dense"
                            name="botName"
                            InputProps={{
                              style: appTheme.textDefault
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} lg={6}>
                          <Box display="flex" justifyContent="flex-end" alignItems="center"
                            p={1} m={1} style={{ marginRight: "0", paddingRight: "0" }}>
                            <DeleteIcon onClick={deleteIntent}
                              style={{ cursor: "pointer", "color": appStyle.colorGreyLight }}
                              fontSize="medium"></DeleteIcon>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid xs={12}>
                        <div style={{ width: "100%" }}>
                          <Autocomplete
                            multiple
                            id="tags-filled"
                            options={["hdfc", "axis", "citi", "indus"]}
                            defaultValue={["hdfc", "axis", "citi", "indus"]}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip key={option} variant="outlined" label={option} {...getTagProps({ index })} />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" variant="outlined"
                                label="synonyms" placeholder="Enter one or cluster names to merge with this cluster" />
                            )}
                          />
                        </div>
                      </Grid>
                      <Grid xd={12} >
                        <div>
                          <CssTextField id="outlined-multiline-static"
                            fullWidth
                            multiline
                            rows={20}
                            value={arrayToString(clusterData[selectedClusterName])}
                            margin="dense"
                            InputProps={{
                              style: {
                                color: appStyle.colorOffBlack,
                                fontSize: appStyle.fontSizeDefault,
                                lineHeight: "2.3"
                              }
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            name={selectedClusterName}
                            onChange={handleInputChange}

                          />
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
                <Grid xs={12} container justify="right" >
                  <StyledButton onClick={() => { setClusterData(originalDataset) }}>Reset</StyledButton>
                  <StyledButton onClick={() => { console.log("New Page") }}>Next</StyledButton>
                  {snackBar.show ?
                    <SnackBarComponent open={snackBar.show}
                      type={snackBar.type}
                      message={snackBar.message}
                      callBack={handleCloseSnackBar} />
                    : null}
                </Grid>
              </div>
            </div>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}



const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 }]


function validateInput() {

}

const intentValues = {
  "greeting": [
    "What is the national animal of Canada?",
    "What is the national animal of Albania?",
    "Which dog used to be sacred in China",
    "Urticaria is a skin disease otherwise known as what?	Hives",
    "What kind of animal is the largest living creature on Earth",
    // "Give another name for the study of fossils?	",
    // "Which bird can swim but cannot fly?",
    // "What do dragonflies prefer to eat",
    // "What do you get when you crossbreed a donkey and a horse?",
    // "Which insects cannot fly, but can jump higher than 30 cm,What kind of animal is the largest living creature on Earth",
    // "What is the name of the European Bison",
    // "What is called a fish with a snake-like body?",
    // "In which city is the oldest zoo in the world?",
    // "After which animals are the Canary Islands named?",
    // "Which plant does the Canadian flag contain?",
    // "What is the food of penguins?	",
    // "Which is the largest species of the tiger?	",
    // "The bite of which insect causes the Lyme Disease?	",
    // "Which mammal cannot jump?",
    // "In which city is the oldest zoo in the world?",
    // "After which animals are the Canary Islands named?",
    // "Which plant does the Canadian flag contain?",
    // "What is the food of penguins?	",
    // "Which is the largest species of the tiger?	",
    // "The bite of which insect causes the Lyme Disease?	",
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
