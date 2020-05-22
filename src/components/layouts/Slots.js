import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract.jpg';
import SlotCard from '../SlotCard';
import CSlider from '../CSlider';
import CButton from '../CButton';
import { appStyle, appTheme } from '../../styles/global';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import GetSlots from '../../API/getSlots';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackBarComponent from '../SnackbarComponent';


// const slotValues = [
//   {
//     "value": "actionType",
//     "synonyms": ["add", "remove", "register", "signup"]
//   },
//   {
//     "value": "bankNames",
//     "synonyms": ["hdfc", "axis", "citi", "indus"]
//   },
//   {
//     "value": "cityNames",
//     "synonyms": ["bangalore", "hydrabad", "mumbai", "delhi", "bopal", "ahmadabad"]
//   },
//   {
//     "value": "riverNames2",
//     "synonyms": ["ganga", "yamuna", "tunga"]
//   },
//   {
//     "value": "cityNames1",
//     "synonyms": ["bangalore", "hydrabad", "mumbai", "delhi", "bopal", "ahmadabad"]
//   },
//   {
//     "value": "riverNames1",
//     "synonyms": ["ganga", "yamuna", "tunga"]
//   }
// ]

export default function Slots(props) {
  console.log("slots props", props);
  const originalSlotValues = props.location.slotValues
  const [disableValue, setDisableValue] = React.useState([]);
  const [values, setValues] = useState(originalSlotValues)
  const [previousValues, setPreviousValues] = useState(props.location.values)
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState({ type: "error", show: false, message: "" });
    //Error Handling Snackbar
    const handleCloseSnackBar = () => {
        setSnackBar({ type: "error", show: false, message: "" })
    };
  const handleClick = (event, value) => {
    var mode
    (value == 0) ? (mode = 'loose') : ((value == 50) ? (mode = 'moderate') : (mode = 'strict'))
    if (previousValues.autoGenerateSynonymMode != mode) {
        setLoading(true)
      previousValues.autoGenerateSynonymMode= mode;
      GetSlots(previousValues).then(result=>{
        setValues(result)
        setLoading(false)
      })
      .catch(errmessage =>{setSnackBar({ type: "error", show: true, message: errmessage });setLoading(false);});;
    }
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
           {loading && <CircularProgress thickness={5}  style={{position: 'fixed',top: '50%',left: '50%',margin: '-50px 0px 0px -50px',zIndex: '100'    }}       />}
          <Grid item xs={12}>
            <div style={{ padding: "1.7em 2em" }}>
              <div>
                <Box display="flex">
                  <Box flexGrow={1}>
                    <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Identify Slots</Typography>
                  </Box>
                  <Box alignSelf="center" >
                    <CSlider value={previousValues.autoGenerateSynonymMode} onChange={handleClick}></CSlider>
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
                  <AddCircleRoundedIcon
                    style={{ margin: "2em 0.5em", color: "grey", fontSize: "2em", cursor: "pointer" }}
                    onClick={() => { setValues([...values, { value: "", synonyms: [] }]) }} />
                </Grid>
                <br></br>
                <Grid xs={12}>
                  <Box display="flex" p={1}>
                    <Box flexGrow={1} p={1}>
                      <CButton onClick={() => { setValues({}); }} name="Reset" />
                    </Box>
                    <Box p={1}>
                      <CButton onClick={() => { console.log("New Page") }} name="Next" />
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
  );
}


//window.addEventListener("keyup", checkForRefresh, false);

window.onkeyup =  function(event) {
   if (event.keyCode == 116) {
        alert("Data will be lost if you refresh the page. Are you sure?");

   }
};