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
import SnackBarComponent from '../SnackBarComponent';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Divider from '@material-ui/core/Divider';


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
      borderRadius: "20px"
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

export default function Intents() {
  const classes = useStyles();
  const originalDataset = myCustomeInput;
  const [clusterData, setClusterData] = React.useState(myCustomeInput);
  const [selectedClusterName, setSelectedClusterName] = React.useState(Object.keys(clusterData)[0]);
  const [clusterNames, setClusterNames] = React.useState(Object.keys(clusterData));
  const [addIntent, setAddIntent] = React.useState('');
  const [mergedClusters, setMergedClusters] = React.useState({});
  const [fixedOptions, setFixedOptions] = React.useState([selectedClusterName]);

  //Error Handling Snackbar
  const [snackBar, setSnackBar] = useState({ type: "error", show: false, message: "" });
  const handleCloseSnackBar = () => {
    setSnackBar({ type: "error", show: false, message: "" })
  };

  const handleInputChange = (e) => {
    console.log(e)
    const { name, value } = e.target
    console.log(name, "+", value);
    if (name == "addNewIntent") {
      setAddIntent(value)
      if (Object.keys(clusterData).includes(value)) {
        // Garima - Show red cross icon for not available
        // setSnackBar({ type: "error", show: true, message: "Not Available" });
      }
      else {
        // Garima - Show green right icon for available
        // setSnackBar({ type: "success", show: true, message: "Available" });
      }
    }
    else {
      // **************** what is this else condition? ****** need to handle as else if ************
      const updatedValue = strToArray(value);
      setClusterData({ ...clusterData, [name]: updatedValue })
    }

  }

  const handleOnChangeMergeClusters = (event, newValue) => {
    console.log("handleOnChangeMergeClusters - ", newValue);
    setFixedOptions([
      ...fixedOptions,
      ...newValue.filter(option => fixedOptions.indexOf(option) === -1)
    ]);

    newValue.splice(selectedClusterName, 1);
    mergedClusters[selectedClusterName] = newValue;
    console.log("mergedClusters - ", mergedClusters);
    setMergedClusters(mergedClusters);
    getFilteredClusterNames();
  }

  const getFilteredClusterNames = () => {
    console.log("getFilteredClusterNames...")
    const mergedClusts = [].concat.apply([], (Object.values(mergedClusters)));
    const filClusterNames = (Object.keys(clusterData)).filter(function (el) {
      return (mergedClusts).indexOf(el) < 0;
    });
    setClusterNames(filClusterNames);
  }

console.log("clusters",clusterNames);
  // const mergeIntent = (e, intialValues) => {

  //   var values = intialValues
  //   console.log("values", intialValues);
  //   var indexselectedClusterName = values.indexOf(selectedClusterName)
  //   if (indexselectedClusterName !== -1) {
  //     values.splice(indexselectedClusterName, 1);
  //   }

  //   var updatedValue = clusterData[selectedClusterName]
  //   var deletedClusterDataValue = '';
  //   var deleteIntentKey;

  //   if ((deletedClusterData.hasOwnProperty(selectedClusterName))) {
  //     console.log("deletedClusterData--", deletedClusterData[selectedClusterName]);
  //     var deletedKeys = Object.keys(deletedClusterData[selectedClusterName])
  //     console.log("deletedKeys", deletedKeys);
  //     if (!(deletedKeys.every(val => values.includes(val)))) {
  //       //Value removed from the merge
  //       for (var index in deletedKeys) {
  //         var deleteValue = deletedKeys[parseInt(index)]
  //         console.log(deleteValue);
  //         if (!(values.includes(deleteValue))) {
  //           //Value is removed from merge Intent so delete it from the deleted intent and add back to cluster data and remove from selectedClusterName values
  //           var newValue = (arrayToString(updatedValue).replace(arrayToString(deletedClusterData[selectedClusterName][deleteValue]), ""))
  //           console.log(newValue)
  //           setClusterData({ ...clusterData, [deleteValue]: strToArray(deletedClusterData[selectedClusterName][deleteValue]), [selectedClusterName]: newValue });
  //           var deleteDeletedCluster = [deleteValue]
  //           deletedClusterData[selectedClusterName] = (Object.fromEntries(
  //             Object.entries(deletedClusterData[selectedClusterName]).filter(
  //               ([key, val]) => !deleteDeletedCluster.includes(key)
  //             )
  //           ));

  //         }
  //       }
  //       return;
  //     }

  //   }


  //   for (var index in values) {
  //     var value = values[parseInt(index)]

  //     if ((value in clusterData)) {
  //       updatedValue = (updatedValue + "," + clusterData[value]).split(',');
  //       (deletedClusterDataValue == '') ? (deletedClusterDataValue += `"${value}":"${clusterData[value]}"`) : (deletedClusterDataValue += `,"${value}":"${clusterData[value]}"`)
  //       deleteIntentKey = [value];
  //     }
  //     else if ((value in deletedClusterData[selectedClusterName])) {
  //       (deletedClusterDataValue == '') ? (deletedClusterDataValue += `"${value}":"${deletedClusterData[selectedClusterName][value]}"`) : (deletedClusterDataValue += `,"${value}":"${deletedClusterData[selectedClusterName][value]}"`)
  //     }
  //   };

  //   //update values of the deletedCluster and main cluster and delete the main cluster merged  Intent
  //   clusterData[selectedClusterName] = updatedValue
  //   setDeletedClusterData({ ...deletedClusterData, [selectedClusterName]: (JSON.parse(`{ ${deletedClusterDataValue} }`)) })
  //   if (deleteIntentKey) {
  //     setClusterData(Object.fromEntries(
  //       Object.entries(clusterData).filter(
  //         ([key, val]) => !deleteIntentKey.includes(key)
  //       )
  //     ));
  //   }

  //   setSnackBar({ type: "success", show: true, message: "Merge successfull" });

  // }

  const deleteIntent = (e) => {

    if (window.confirm('Are you sure you want to delete?')) {
      const deleteIntentKey = [selectedClusterName];
      console.log(deleteIntentKey)
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

  return (

    <Grid container style={{
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
        }}>

          <Grid item xs={12}>
            <div style={{ padding: "1.7em 2em", height: "80vh" }}>
              <div>
                <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Identify Intents</Typography>
              </div>

              <div style={{ margin: "2em 2em" }}>
                <Grid container spacing={2}>
                  <Grid item xs={3} >
                    <div style={{ background: "#FFF", padding: "1em", borderRadius: "7px" }}>

                      <CssTextField id="outlined-full-width"
                        placeholder=""
                        fullWidth
                        margin="dense"
                        InputProps={{
                          style: appTheme.textDefault
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        placeholder="Add New Cluster"
                        name="addNewIntent"
                        value={addIntent}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleInputChange}
                        onKeyPress={event => {
                          if (event.key === 'Enter') {
                            if (!(Object.keys(clusterData).includes(addIntent))) {
                              setClusterData({ ...clusterData, [addIntent]: "" })
                              setSnackBar({ type: "success", show: true, message: "New cluster has been created" });
                              setAddIntent('')
                              getFilteredClusterNames()
                            }
                          }
                        }}
                      />
                      <Divider style={{ marginTop: "10px" }} />

                      <List style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                        {clusterNames.map((clusterName) => (
                          <StyledListItem button key={clusterName} divider={1}
                            style={selectedClusterName == clusterName ? { background: "rgb(235, 112, 119, 0.5)", color: "#fff" } : {}}
                            onClick={()=>{
                              setSelectedClusterName(clusterName);
                              var mgdCluts = mergedClusters[clusterName];
                              const nexFixOptions = mgdCluts != undefined && mgdCluts.length >= 1 ? [clusterName].concat(mgdCluts) : [clusterName];
                              setFixedOptions(nexFixOptions);}}>
                            <ListItemText primary={clusterName} />
                          </StyledListItem>
                        ))}

                      </List>
                    </div>
                </Grid>
                <Grid item xs={9}>
                  <div style={{ background: "#FFF", padding: "1em", borderRadius: "7px" }}>
                    <Grid xs={12} container spacing={1} >
                      <Grid item md={9} lg={9}>
                        <CssTextField id="outlined-full-width"
                          placeholder=""
                          fullWidth
                          margin="dense"
                          name="botName"
                          value={selectedClusterName}
                          InputProps={{
                            style: appTheme.textDefault
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={3} lg={3}>
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
                          value={fixedOptions}
                          onChange={handleOnChangeMergeClusters}
                          options={Object.keys(clusterData)}
                          filterSelectedOptions
                          getOptionLabel={option => option}
                          renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                              <Chip
                                label={option}
                                {...getTagProps({ index })}
                                disabled={fixedOptions.indexOf(option) !== -1}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField {...params} margin="normal" variant="outlined"
                              label="Merge Clusters" placeholder="Choose one or more cluster names to merge with this cluster" />
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
    </Grid >
  );
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
