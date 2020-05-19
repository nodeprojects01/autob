import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract.jpg';
import SlotCard from '../SlotCard';
import CTextField from '../CTextField';
import CAutocomplete from '../CAutocomplete';
import CSlider from '../CSlider';
import CButton from '../CButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import { grey } from '@material-ui/core/colors';
import { appStyle, appTheme } from '../../styles/global';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';



const slotValues = [
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

export default function Slots() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [disableValue, setDisableValue] = React.useState([]);
  const [values, setValues] = useState(slotValues)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log(values)

  const settingHandleClose = () => {
    setAnchorEl(null);
  };
  const handleDisable = (e, value) => {
    if (disableValue.includes(value)) {
      setDisableValue(disableValue.filter((e) => (e !== value)))
    }
    else {
      setDisableValue(disableValue.concat(value))
    }
  }
  const handleInputchange = (e, synonymValues, index) => {
    console.log("handleInput")
    const { name, value } = e.target
    console.log(name, "+", value);
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
  const addBlankSlots = () => {

  }


  return (
    <Grid container style={{
      // backgroundColor: "#4F5457" 
      backgroundImage: `url(${image1})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      padding: "3em 0 0 0",
    }}>
      <Box display="flex" justifyContent="flex-end" >
        <Box style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "32px 0 0 0",
          width: "96%",
          textAlign: "left"
          // boxShadow:"rgb(68, 105, 123, 0.6) -7px -5px 15px"
        }}>

          <Grid item xs={12}>
            <div style={{ padding: "1.7em 2em" }}>
              <div>
                <Box display="flex">
                  <Box flexGrow={1}>
                    <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Identify Slots</Typography>
                  </Box>
                  <Box alignSelf="center" onClick={handleClick}>
                    <CSlider></CSlider>
                    {/* <SettingsIcon
                      style={{ cursor: "pointer", "color": appStyle.colorOffBlack }}
                      fontSize="small"
                      aria-controls="simple-menu" aria-haspopup="true"
                    /> */}
                  </Box>
                  {/* <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={settingHandleClose}
                  >
                    <MenuItem value={"strict"} onClick={settingHandleClose}>Strict</MenuItem>
                    <MenuItem value={"moderate"} onClick={settingHandleClose}>Moderate</MenuItem>
                    <MenuItem value={"loose"} onClick={settingHandleClose}>Loose</MenuItem>
                  </Menu> */}
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
                  <AddCircleRoundedIcon 
                  style={{margin: "2em 0.5em", color: "grey", fontSize:"2em", cursor: "pointer"}}
                  onClick={() => { setValues([...values, { value: "", synonyms: [] }]) }} />
                </Grid>
                <br></br>
                <Grid xs={12}>
                  <Box display="flex" p={1}>
                    <Box flexGrow={1} p={1}>
                      <CButton onClick={() => { setValues(slotValues); }} name="Reset" />
                    </Box>
                    <Box p={1}>
                      <CButton onClick={() => { console.log("New Page") }} name="Next" />
                    </Box>
                  </Box>
                </Grid>
              </div>
            </div>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
