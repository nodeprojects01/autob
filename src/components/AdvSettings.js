import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import image1 from '../images/abstract.jpg'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SnackBarComponent from './SnackbarComponent';
import { appStyle, appTheme } from '../styles/global';


const StyledButton = withStyles({
    root: appTheme.buttonDefault,
    label: {
        textTransform: 'capitalize',
    },
})(Button);

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
    const [values, setValues] = useState({
        synonymGenerating: 'auto_generate_synonyms',
        customSynonymsJSON: '',
        autoGenerateSynonymMode: 'moderate',
        removeUnimportantWords: '',
        outputUtterance: 'alphanumeric',
        maxMinLengthCluster: '0.6/0.2',
        uploadJSONFileHidden: ''
    })
    const [customVisible, setCustomVisible] = useState(false);

    const handleInputchange = (e) => {
        const { name, value } = e.target
        console.log(name, "+", value);
        if (name === "synonymGenerating") {
            if (value === "custom_synonyms")
                setCustomVisible(true);
            else
                setCustomVisible(false);
        }
        if ((name === "uploadJSONFileHidden") && ((/\.(json)$/i).test(value))) {
            let file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (e) {
                const content = reader.result;
                setValues({ ...values, customSynonymsJSON: content, uploadJSONFileHidden: value })
            }
        }
        setValues({ ...values, [name]: value })
    }

    //Error Handling Snackbar
    const [snackBar, setSnackBar] = useState({ type: "error", show: false, message: "" });
    const handleCloseSnackBar = () => {
        setSnackBar({ type: "error", show: false, message: "" })
    };

    //Onsubmit action
    const handleSubmit = e => {
        e.preventDefault();
        let errorstatus = validateInput(values, customVisible);
        if (errorstatus) {
            setSnackBar({ show: true, message: errorstatus });
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
                        <CssTextField
                            id="outlined-full-width"
                            select
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            name="synonymGenerating"
                            value={values.synonymGenerating}
                            onChange={handleInputchange}
                            InputProps={{
                                style: appTheme.textDefault
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >
                            <MenuItem value={"auto_generate_synonyms"}>Auto Generate Synonyms</MenuItem>
                            <MenuItem value={"custom_synonyms"}>Custom Synonyms</MenuItem>
                            <MenuItem value={"apply_global synonyms"}>Apply Global Synonyms</MenuItem>
                        </CssTextField>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <div>
                        <Typography style={appTheme.textSmall}>Auto Generate Synonym Mode</Typography>
                    </div>
                    <div>
                        <CssTextField id="outlined-full-width"
                            select
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            name="autoGenerateSynonymMode"
                            value={values.autoGenerateSynonymMode}
                            onChange={handleInputchange}
                            InputProps={{
                                style: appTheme.textDefault
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >
                            <MenuItem value={"strict"}>Strict</MenuItem>
                            <MenuItem value={"moderate"}>Moderate</MenuItem>
                            <MenuItem value={"loose"}>Loose</MenuItem>
                        </CssTextField>
                    </div>
                </Grid>
                {customVisible &&
                    <Grid item xs={12} sm={12}>
                        <div>
                            <Box display="flex">
                                <Box flexGrow={1}>
                                    <Typography style={appTheme.textSmall}>Custom Synonyms</Typography>
                                </Box>
                                <Box>
                                    <CssTextField className={classes.hiddenInput} id="contained-button-JSONfile" name="uploadJSONFileHidden" type="file" onChange={handleInputchange} />
                                    <label htmlFor="contained-button-JSONfile">
                                        <Button style={{ backgroundColor: 'Transparent', padding: "0px" }} component="span">
                                            <Typography style={appTheme.textSmall}>Browse Json</Typography>
                                        </Button>
                                    </label>
                                </Box>
                            </Box>
                            <div>
                                <CssTextField id="outlined-multiline-static"
                                    placeholder="Paste the json or upload json file"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="dense"
                                    InputProps={{
                                        style: appTheme.textDefault
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    name="customSynonymsJSON"
                                    value={values.customSynonymsJSON}
                                    onChange={handleInputchange}
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
                        <CssTextField id="outlined-full-width"
                            placeholder="Require comma separated values"
                            name="removeUnimportantWords"
                            value={values.removeUnimportantWords}
                            onChange={handleInputchange}
                            fullWidth
                            margin="dense"
                            InputProps={{
                                style: appTheme.textDefault
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={appTheme.textSmall}>Output Utterance Type</Typography>
                    </div>
                    <div>
                        <CssTextField id="outlined-full-width"
                            select
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            name="outputUtterance"
                            value={values.outputUtterance}
                            onChange={handleInputchange}
                            InputProps={{
                                style: appTheme.textDefault
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >
                            <MenuItem value={"alphanumeric"}>Alphanumeric</MenuItem>
                            <MenuItem value={"extract_only text"}>Extract Only text</MenuItem>
                        </CssTextField>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={appTheme.textSmall}>Max/Min Length of each cluster</Typography>
                    </div>
                    <div>
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
                            name="maxMinLengthCluster"
                            value={values.maxMinLengthCluster}
                            onChange={handleInputchange}
                        />
                    </div>
                </Grid>

                <br></br>
                <div>
                    <StyledButton onClick={handleSubmit} >Save</StyledButton>
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

function validateInput(values, customVisible) {
    if (customVisible) {
        if (values.uploadJSONFileHidden && (!(/\.(json)$/i).test(values.uploadJSONFileHidden))) {
            return "Please upload only json file"
        }
        if ((!values.customSynonymsJSON)) {
            return "Please enter json file.";
        }
        if (!isDict(values.customSynonymsJSON)) {
            return "Please upload only json file";
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