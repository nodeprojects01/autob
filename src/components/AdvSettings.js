import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import SnackBarComponent from './SnackbarComponent';
import { appStyle, appTheme } from '../styles/global';
import CTextField from './CTextField';
import CButton from './CButton';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            // margin: theme.spacing(2),
            width: '100%',
        },
    },
    inputLabel: {
        color: "lightgray",
        "&$inputFocused": {
            color: "orange"
        }
    },
    inputFocused: {},
    hiddenInput: {
        display: 'none'
    }
}));


export default function AdvSettings(props) {
    const classes = useStyles();
    //Error Handling Snackbar
    const [snackBar, setSnackBar] = useState({ type: "error", show: false, message: "" });
    const handleCloseSnackBar = () => {
        setSnackBar({ type: "error", show: false, message: "" })
    };

    //Onsubmit action
    const handleSubmit = e => {
        e.preventDefault();
        let errorstatus = validateInput(props.values);
        if (errorstatus) {
            setSnackBar({ type: "error", show: true, message: errorstatus });
        }
        else {
            //Or go to next page or any other operation
            //    console.log("success")
            props.onClick();
        }
    }

    return (
        <div style={{ padding: "2em" }}>
            <div>
                <Typography variant="h5" style={appTheme.textHeader}>Settings</Typography>
            </div>

            <Grid container spacing={2} style={{ margin: "2em 2em", width: "90%" }}>
                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={appTheme.textSmall}>Synonym Generating Type</Typography>
                    </div>
                    <div>
                        <CTextField
                            select
                            name="synonymGenerating"
                            value={props.values.synonymGenerating}
                            onChange={props.setValues}
                        >
                            <MenuItem value={"auto_generate_synonyms"}>Auto Generate Synonyms</MenuItem>
                            <MenuItem value={"custom_synonyms"}>Custom Synonyms</MenuItem>
                            <MenuItem value={"apply_global synonyms"}>Apply Global Synonyms</MenuItem>
                        </CTextField>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <div>
                        <Typography style={appTheme.textSmall}>Auto Generate Synonym Mode</Typography>
                    </div>
                    <div>
                        <CTextField
                            select
                            name="autoGenerateSynonymMode"
                            value={props.values.autoGenerateSynonymMode}
                            onChange={props.setValues}
                        >
                            <MenuItem value={"strict"}>Strict</MenuItem>
                            <MenuItem value={"moderate"}>Moderate</MenuItem>
                            <MenuItem value={"loose"}>Loose</MenuItem>
                        </CTextField>
                    </div>
                </Grid>
                {props.values.customVisible &&
                    <Grid item xs={12} sm={12}>
                        <div>
                            <Box display="flex">
                                <Box flexGrow={1}>
                                    <Typography style={appTheme.textSmall}>Custom Synonyms</Typography>
                                </Box>
                                <Box>
                                    <TextField className={classes.hiddenInput} id="contained-button-JSONfile" name="uploadJSONFileHidden" type="file" onChange={props.setValues} />
                                    <label htmlFor="contained-button-JSONfile">
                                        <Button style={{ backgroundColor: 'Transparent', padding: "0px" }} component="span">
                                            <Typography style={appTheme.textSmall}>Browse Json</Typography>
                                        </Button>
                                    </label>
                                </Box>
                            </Box>
                            <div>
                                <CTextField
                                    placeholder="Paste the json or upload json file"
                                    multiline
                                    rows={4}
                                    name="customSynonymsJSON"
                                    value={props.values.customSynonymsJSON}
                                    onChange={props.setValues}
                                />
                            </div>
                        </div>

                    </Grid>
                }
                <Grid item xs={12} sm={12}>
                    <div>
                        <Typography style={appTheme.textSmall}>Remove Unimportant Words</Typography>
                    </div>
                    <div>
                        <CTextField
                            placeholder="Enter comma separated values"
                            name="removeUnimportantWords"
                            value={props.values.removeUnimportantWords}
                            onChange={props.setValues}
                        />
                    </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={appTheme.textSmall}>Output Utterance Type</Typography>
                    </div>
                    <div>
                        <CTextField
                            select
                            name="outputUtterance"
                            value={props.values.outputUtterance}
                            onChange={props.setValues}
                        >
                            <MenuItem value={"alphanumeric"}>Alphanumeric</MenuItem>
                            <MenuItem value={"extract_only text"}>Extract Only text</MenuItem>
                        </CTextField>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={appTheme.textSmall}>Max/Min Length of each cluster</Typography>
                    </div>
                    <div>
                        <CTextField
                            name="maxMinLengthCluster"
                            value={props.values.maxMinLengthCluster}
                            onChange={props.setValues}
                        />
                    </div>
                </Grid>
                <br></br>
                <br></br>
                <div>
                    <CButton onClick={handleSubmit} name="Save" />
                    {snackBar.show ?
                        <SnackBarComponent open={snackBar.show}
                            type={snackBar.type}
                            message={snackBar.message}
                            callBack={handleCloseSnackBar} />
                        : null}
                </div>
            </Grid>

        </div>
    );
}


//Validation of advance setting

function validateInput(values) {
    if (values.customVisible) {
        if (values.customSynonymsJSON) {
            if (!isDict(values.customSynonymsJSON)) {
                return "Please upload file in JSON format."
            }
        }
        else {
            return "Please enter json file.";
        }
    }
    if ((values.removeUnimportantWords) && (!checkisArray(values.removeUnimportantWords))) {
        return "Remove unimportant word must be comma separated";
    }
    if (values.maxMinLengthCluster) {
        var [max, min] = ((values.maxMinLengthCluster).split("/"));
        min = parseFloat(min);
        max = parseFloat(max);
        if ((min == min.toFixed(1)) && (max == max.toFixed(1))) {
            if ((0.2 <= min) && (min <= 0.9) && (0.2 <= max) && (max <= 1.0)) {
                if (min > max) {
                    return "min_utterances_similarity must be less than max_utterances_similarity";
                }
            }
            else {
                return "Please Enter 0.2 <= max_utterances_similarity <= 1.0 and 0.2 <= min_utterances_similarity <= 0.9";
            }
        }
        else {
            return "Please enter float value with one precision state"
        }
    }
    else {
        return "Please enter max/min similiarity. Eg-0.6/0.2";
    }

}
function isDict(v) {
    try {
        if (Object.getPrototypeOf(JSON.parse(v)) === Object.prototype)
            return true;
    }
    catch{
        return false;
    }
}

function checkisArray(userInput) {
    try {
        if (userInput.search(" ") == 0) {
            return false;
        }
        var splitting = userInput.split(",");
        if (Object.prototype.toString.call(splitting) === '[object Array]') {
            return true;
        }
    }
    catch{
        return false;
    }
}