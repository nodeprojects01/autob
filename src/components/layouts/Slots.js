import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract.jpg';
import SlotCard from '../SlotCard';
import CSlider from '../CSlider';
import CButton from '../CButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { appStyle, appTheme } from '../../styles/global';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackBarComponent from '../SnackbarComponent';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { getIntents, getSlots } from '../../external/textCluster';
import { getSlotValue, setSlotValue, setInputParams, getInputParams } from '../../global/appVariable';
import HomeIcon from '@material-ui/icons/Home';
import Popper from '@material-ui/core/Popper';
import SettingsIcon from '@material-ui/icons/Settings';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import CTextField from '../CTextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Slots() {
  const classes = useStyles();
  const history = useHistory();
  const [disableValue, setDisableValue] = React.useState([]);
  const [values, setValues] = useState(getSlotValue())
  const [previousValues, setPreviousValues] = useState(getInputParams())
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({ type: "error", show: false, message: "" });
  const [autoGenerateSynonym, setAutoGenerateSynonym] = React.useState(previousValues.autoGenerateSynonymMode);
  const [synonymGenerating,setsynonymGenerating]=useState(previousValues.synonymGenerating)
  //Error Handling Snackbar
  const handleCloseSnackBar = () => {
    setSnackBar({ type: "error", show: false, message: "" })
  };
  const handleClick = (event, value) => {
    console.log("mode > ", value);
    var mode
    (value == 0) ? (mode = 'loose') : ((value == 50) ? (mode = 'moderate') : (mode = 'strict'))
    if (previousValues.autoGenerateSynonymMode != mode) {
      setAutoGenerateSynonym(mode)
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handlePopperClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  React.useEffect(() => {
    const globalParams = getInputParams();
    if (Object.keys(globalParams).length == 0) {
      window.onload = function () {
        history.push({
          pathname: '/',
        });
      }
    }
  }, []);


  const handleDisable = (e, value) => {
    if (disableValue.includes(value)) {
      setDisableValue(disableValue.filter((e) => (e !== value)))
    }
    else {
      setDisableValue(disableValue.concat(value))
    }
  }
  const handleInputchange = (e, synonymValues, index) => {
    const { name, value } = e.target;
    if (name == "slotNames") {
      setValues(values.map((data, j) => {
        if (j === index) {
          data.value = value
          return data
        }
        else {
          return data
        }
      }));
    }
    else {
      // for autoComplete
      setValues(values.map((data, j) => {
        if (j === index) {
          data.synonyms = synonymValues
          return data
        }
        else {
          return data
        }
      }));

    }
  }
  const validateSlotBlank = () => {
    var slotBlank = false;
    values.map((data) => {
      if (data.value == '') {
        slotBlank = true
      }
    })
    return slotBlank
  }

  //Handle Submit 
  const handleSubmit = e => {
    var disabledSlotRemove = values.filter((data) => {
      if (!disableValue.includes(data.value)) {
        return data
      }
    })
    setValues(disabledSlotRemove);
    setSlotValue(disabledSlotRemove);
    setInputParams(previousValues);
    setLoading(true);
    getIntents().then(result => {
      setLoading(false);
      history.push({
        pathname: '/intents'
      });
    })
      .catch(errmessage => { setSnackBar({ type: "error", show: true, message: errmessage }); setLoading(false) })
  }
  console.log("running slots page")
  const onSlotSettingsChange = () => {
    var updateInputparams = { ...previousValues,synonymGenerating : synonymGenerating, autoGenerateSynonymMode: autoGenerateSynonym }
    setPreviousValues(updateInputparams);
    setOpen(false)
    setInputParams(updateInputparams)
    setLoading(true)
    getSlots().then(() => {
      setValues(getSlotValue())
      setLoading(false)
    }).catch(errmessage => {
      setSnackBar({ type: "error", show: true, message: errmessage });
      setLoading(false)
    });
  }
  
  const handleSynonymGenerating=(e)=>{
    var { name, value } = e.target;
    console.log(value)
    setsynonymGenerating(value)
  }
  return (
    <div>
      {loading &&
        <Backdrop className={classes.backdrop} open={true} >
          <CircularProgress thickness={5} style={{ position: 'fixed', top: '50%', left: '50%', margin: '-50px 0px 0px -50px' }} />
        </Backdrop>
      }
      <Popper style={{ zIndex: "999" }} open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ padding: "2em", width: "15em", zIndex: "999" }}>
              <div>
                <Typography style={appTheme.textSmall}>Synonym Generating Type</Typography>
              </div>
              <div>
                <CTextField
                  select
                  name="synonymGenerating"
                  value={synonymGenerating}
                  onChange={handleSynonymGenerating}
                >
                  <MenuItem value={"auto_generate_synonyms"}>Auto Generate Synonyms</MenuItem>
                  <MenuItem value={"apply_global_synonyms"}>Apply Global Synonyms</MenuItem>
                </CTextField>
              </div>
              <br />
              {synonymGenerating == "auto_generate_synonyms" ?
                <div>
                  <div>
                    <Typography style={appTheme.textSmall}>Auto Generate Synonym Mode</Typography>
                  </div>
                  <CSlider value={autoGenerateSynonym} onChange={handleClick}></CSlider>
                </div>
                : ""}
              <br /><br />
              <Box display="flex">
                <Box flexGrow={1}>
                  <CButton type="small" onClick={onSlotSettingsChange} name="Done" />
                </Box>
                <Box>
                  <CButton type="small"
                    onClick={() => { setAutoGenerateSynonym(previousValues.autoGenerateSynonymMode); setOpen(false) }}
                    name="Cancel" />
                </Box>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
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

      <Grid style={{
        // backgroundColor: "#4F5457" 
        backgroundImage: `url(${image1})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        padding: "3em 0 0 0",
        width: "100%",
        minHeight: "100vh"
      }}>

        <Box display="flex" justifyContent="flex-end" >
          <Box style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "32px 0 0 0",
            width: "96%",
            textAlign: "left",
            minHeight: "100vh"
            // boxShadow:"rgb(68, 105, 123, 0.6) -7px -5px 15px"
          }}>

            <Grid item xs={12}>
              <div style={{ padding: "1.7em 2em" }}>
                <div>
                  <Box display="flex">
                    <Box flexGrow={1}>
                      <Typography style={appTheme.textHeader}>Identify Slots</Typography>
                    </Box>
                    <Box alignSelf="center" >
                      <SettingsIcon onClick={handlePopperClick('left-start')}
                        style={{ cursor: "pointer", "color": appStyle.colorGreyLight }}
                        fontSize="small" />
                    </Box>
                  </Box>
                </div>

                <div style={{ margin: "2em 2em" }}>
                  <Grid container justify="left" spacing={2}>
                    {values.map((value, index) => (
                      <Grid item key={value.value} item md={4} lg={4} >
                        <SlotCard disabled={disableValue}
                          name="slotNames"
                          slotValues={value}
                          onClickDisable={(e) => { handleDisable(e, value.value) }}
                          onChange={(e, value) => { handleInputchange(e, value, index) }}
                        >
                        </SlotCard>
                      </Grid>

                    ))}
                    <Grid item md={4} lg={4}>
                      <Card container style={{ cursor: "pointer", }}
                        onClick={() => {
                          if (!validateSlotBlank()) {
                            setValues([...values, { value: "", synonyms: [] }])
                          }
                          else {
                            setSnackBar({ type: "error", show: true, message: "Slot name can not be blank" })
                          }
                        }
                        }
                      >
                        <CardContent style={{ padding: "3.5em", background: "rgb(246, 248, 247)", textAlign: "center" }} >
                          <Typography style={appTheme.textDefault} >Add New</Typography>
                          <AddCircleRoundedIcon
                            style={{ color: "grey", fontSize: "2em" }} />
                        </CardContent>

                      </Card>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid xs={12}>
                    <Box display="flex" p={1}>
                      <Box flexGrow={1} p={1}>
                        <CButton onClick={() => { setValues(getSlotValue()) }} name="Reset" />
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

      </Grid>
    </div>
  );
}



