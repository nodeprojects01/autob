import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract.jpg'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { appStyle, appTheme } from '../../styles/global';
import SnackBarComponent from '../SnackbarComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Fade from '@material-ui/core/Fade';
import CTextField from '../CTextField';
import CAutocomplete from '../CAutocomplete';
import CButton from '../CButton';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { getIntents, getSlots } from '../../external/textCluster';
import {
  getSlotValue, setSlotValue, getIntentValue,
  setIntentValue, setInputParams, getInputParams
} from '../../global/appVariable';
import HomeIcon from '@material-ui/icons/Home';
import CSlider2 from '../CSlider2';


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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

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

const arrayToString = (arr) => {
  if (arr != undefined && arr.length != 0) {
    return arr.toString().replace(/,/g, "\n");
  }
  else {
    return "";
  }
}

const strToArray = (str) => {
  return str.replace(/(?:\r\n|\r|\n)/g, ',').replace(/\s+/g, ' ').split(',');
}

export default function Intents() {
  const history = useHistory();
  const classes = useStyles();
  const intentValues = getIntentValue();
  if (Object.keys(intentValues).length == 0) {
    window.onload = function () {
      history.push({
        pathname: '/',
      });
    }
  }
  const [clusterData, setClusterData] = React.useState(intentValues);
  const [selectedClusterName, setSelectedClusterName] = React.useState(Object.keys(clusterData)[0]);
  const [clusterNames, setClusterNames] = React.useState(Object.keys(clusterData));
  const [addIntent, setAddIntent] = React.useState('');
  const [mergedClusters, setMergedClusters] = React.useState({});
  const [fixedOptions, setFixedOptions] = React.useState([selectedClusterName]);
  const [checked, setChecked] = React.useState();
  const [checkedIntentName, setCheckedIntentName] = React.useState();
  const [newIntentName, setNewIntentName] = React.useState(Object.keys(clusterData)[0]);
  const [loading, setLoading] = useState(false);


  //Error Handling Snackbar
  const [snackBar, setSnackBar] = useState({ type: "error", show: false, message: "" });
  const handleCloseSnackBar = () => {
    setSnackBar({ type: "error", show: false, message: "" })
  };

  function reset() {
    const intentData = getIntentValue()
    setClusterData(intentData)
    setAddIntent('')
    setMergedClusters({})
    setSelectedClusterName(Object.keys(intentData)[0])
    setClusterNames(Object.keys(intentData))
    setFixedOptions([selectedClusterName])
    setNewIntentName(Object.keys(intentData)[0])
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "addNewIntent") {
      setAddIntent(value)
      if (Object.keys(clusterData).includes(value)) {
        setChecked(true)
      }
      else {
        setChecked(false)
      }
    }
    else if (name == "intentName") {
      setNewIntentName(value)
      if (Object.keys(clusterData).includes(value) || value == '') {
        setCheckedIntentName(true)
      }
      else {
        setCheckedIntentName(false)
      }

    }
    else {
      // **************** what is this else condition? ****** need to handle as else if ************
      const updatedValue = strToArray(value);
      setClusterData({ ...clusterData, [name]: updatedValue })
    }

  }


  const handleOnChangeMergeClusters = (event, newValue) => {
    setFixedOptions([
      ...fixedOptions,
      ...newValue.filter(option => fixedOptions.indexOf(option) === -1)
    ]);

    //update value in the intent after merge

    var updatedValue = (clusterData[selectedClusterName] + "," + clusterData[newValue[newValue.length - 1]]).split(',')
    //Remove duplicates
    updatedValue = updatedValue.filter((item, index) => updatedValue.indexOf(item) === index)
    setClusterData({ ...clusterData, [selectedClusterName]: updatedValue })

    newValue.splice(selectedClusterName, 1);
    mergedClusters[selectedClusterName] = newValue;
    setMergedClusters(mergedClusters);
    getFilteredClusterNames();
  }

  const getFilteredClusterNames = () => {
    console.log("getFilteredClusterNames...");
    const mergedClusts = [].concat.apply([], (Object.values(mergedClusters)));
    const filClusterNames = (Object.keys(clusterData)).filter(function (el) {
      return (mergedClusts).indexOf(el) < 0;
    });
    setClusterNames(filClusterNames);
  }
  const updateClusterName = (newIntentName, selectedClusterName) => {
    clusterNames[clusterNames.indexOf(selectedClusterName)] = newIntentName
    clusterData[newIntentName] = clusterData[selectedClusterName]
    mergedClusters[newIntentName] = mergedClusters[selectedClusterName]
    delete clusterData[selectedClusterName]
    delete mergedClusters[selectedClusterName]
  }

  const deleteIntent = (e) => {

    if (window.confirm('Are you sure you want to delete?')) {
      const deleteIntentKey = [selectedClusterName];
      var position = Object.keys(clusterData).indexOf(selectedClusterName);
      clusterNames.splice(parseInt(position), 1);
      (parseInt(position) > 0) ? (position = parseInt(position) - 1) : (position = parseInt(position) + 1)
      var updatedKeyName = Object.keys(clusterData)[position]
      setSelectedClusterName(updatedKeyName)
      setNewIntentName(updatedKeyName)
      setClusterData(Object.fromEntries(
        Object.entries(clusterData).filter(
          ([key, val]) => !deleteIntentKey.includes(key)
        )
      ));


    }
  }

  const handleSubmit = e => {
    setIntentValue(clusterData)
    history.push({
      pathname: '/createBot',
    });
  }

  const minMax = getInputParams()["maxMinLengthCluster"];

  return (
    <div>
      {loading &&
        <Backdrop className={classes.backdrop} open={true} >
          <CircularProgress thickness={5} style={{ position: 'fixed', top: '50%', left: '50%', margin: '-50px 0px 0px -50px' }} />
        </Backdrop>
      }

      <Box style={{
        position: "absolute", cursor: "pointer",
        padding: "5px 7px", background: "#FFF", borderBottomRightRadius: "12px"
      }} onClick={() => {
        history.push({
          pathname: '/'
        });
      }}>
        <HomeIcon style={{ "color": appStyle.colorGreyLight }} fontSize="small" />
      </Box>

      <Grid container style={{
        backgroundImage: `url(${image1})`,
        // height: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        // minHeight: "100vh",
        padding: "3em 0 0 0",
        width: "100%"
      }}>

        <Box display="flex" justifyContent="flex-end" style={{ width: "100%" }}>
          <Box style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "32px 0 0 0",
            // minHeight: "100%",
            width: "96%",
            textAlign: "left"
          }}>

            <Grid item xs={12}>
              <div style={{ padding: "1.7em 2em" }}>
                {/* <div>
                  <Typography style={appTheme.textHeader}>Identify Intents</Typography>
                </div> */}
                <div>
                  <Box display="flex">
                    <Box flexGrow={1}>
                      <Typography style={appTheme.textHeader}>Identify Intents</Typography>
                    </Box>
                    <Box alignSelf="center" >
                      <CSlider2 value={minMax.split("/")[0]*100} min={minMax.split("/")[1]*100 + 10} max={100} steps={10} />

                    </Box>
                  </Box>
                </div>

                <div style={{ margin: "2em 2em" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={3} >
                      <div style={{ background: "#FFF", padding: "1em", borderRadius: "7px" }}>
                        <Box display="flex">
                          <Box flexGrow={1}>
                            <CTextField
                              placeholder="Add New Cluster"
                              name="addNewIntent"
                              value={addIntent}
                              onChange={handleInputChange}
                              onKeyPress={event => {
                                if (event.key === 'Enter') {
                                  if (!(Object.keys(clusterData).includes(addIntent)) && (addIntent != '')) {
                                    setClusterData({ ...clusterData, [addIntent]: [] })
                                    setClusterNames(([addIntent].concat(clusterNames)))
                                    setAddIntent('')
                                    setChecked(null)
                                    setSnackBar({ type: "success", show: true, message: "New cluster has been created" });
                                  }
                                  else {
                                    setSnackBar({ type: "error", show: true, message: "Enter correct name of the cluster" });
                                  }
                                }
                              }}
                            />
                          </Box>

                          <Box alignSelf="center">
                            {checked == true &&
                              <Fade in={checked}>
                                <CancelIcon style={{ color: "red" }} />
                              </Fade>}
                            {checked == false &&
                              <Fade in={!checked}>
                                <CheckCircleRoundedIcon style={{ color: "green" }} />
                              </Fade>}
                          </Box>

                        </Box>


                        <Divider style={{ marginTop: "10px" }} />

                        <List style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                          {clusterNames.map((clusterName) => (
                            <StyledListItem button key={clusterName} divider={1}
                              style={selectedClusterName == clusterName ? { background: "rgb(235, 112, 119, 0.5)", color: "#fff" } : {}}
                              onClick={() => {
                                setSelectedClusterName(clusterName);
                                setNewIntentName(clusterName)
                                var mgdCluts = mergedClusters[clusterName];
                                const nexFixOptions = mgdCluts != undefined && mgdCluts.length >= 1 ? [clusterName].concat(mgdCluts) : [clusterName];
                                setFixedOptions(nexFixOptions);
                              }}>
                              <ListItemText primary={clusterName} />
                            </StyledListItem>
                          ))}

                        </List>
                      </div>
                    </Grid>
                    <Grid item xs={9}>
                      <div style={{ background: "#FFF", padding: "1em", borderRadius: "7px" }}>
                        <Grid xs={12} container spacing={1} >
                          <Grid item md={6} lg={6}>
                            <Box display="flex">
                              <Box flexGrow={1}>
                                <CTextField
                                  name="intentName"
                                  value={newIntentName}
                                  onChange={handleInputChange}
                                  onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                      if (!(Object.keys(clusterData).includes(newIntentName)) && (newIntentName != '')) {
                                        updateClusterName(newIntentName, selectedClusterName)
                                        setSelectedClusterName(newIntentName)
                                        setCheckedIntentName(null)
                                        setSnackBar({ type: "success", show: true, message: "Name  cluster has been updated" });
                                      }
                                      else {
                                        setSnackBar({ type: "error", show: true, message: "Enter correct name of the cluster" });
                                      }
                                    }
                                  }}
                                />

                              </Box>

                              <Box alignSelf="center">

                                {checkedIntentName == true &&
                                  <Fade in={checkedIntentName}>
                                    <CancelIcon style={{ color: "red" }} />
                                  </Fade>}
                                {checkedIntentName == false &&
                                  <Fade in={!checkedIntentName}>
                                    <CheckCircleRoundedIcon style={{ color: "green" }} />
                                  </Fade>}
                              </Box>

                            </Box>

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
                            <CAutocomplete
                              value={fixedOptions}
                              onChange={handleOnChangeMergeClusters}
                              options={clusterNames}
                            />
                          </div>
                        </Grid>
                        <Grid xd={12} >
                          <div>
                            <CTextField
                              name="utteranceList"
                              multiline
                              rows={10}
                              value={arrayToString(clusterData[selectedClusterName])}
                              name={selectedClusterName}
                              onChange={handleInputChange}
                            />
                          </div>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid xs={12}>
                    <Box display="flex" p={1} style={{ marginTop: "1em" }}>
                      <Box flexGrow={1} p={1}>
                        <CButton onClick={reset} name="Reset" />
                      </Box>
                      <Box p={1}>
                        <CButton onClick={handleSubmit} name="Next" />
                      </Box>
                    </Box>


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
    </div>
  );
}




// const myCustomeInput = {
//   "helloIntent": ["hey", "hi", "hello", "hiiiiiiiii", "heyyyyyyyyyyyy"],
//   "byeIntent": ["b", "by", "bye", "byee", "byeee"],
//   "goodIntent": ["good", "bettter", "best", "happy", "smile"],
//   "hateIntent": ["worst", "bad", "sad", "kill","hello"]
// }
