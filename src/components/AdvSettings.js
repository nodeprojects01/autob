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
import SnackBarComponent from './SnackBarComponent'

const StyledButton = withStyles({
    root: {
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: 'linear-gradient(65deg, #85A2A8 100%, #CFCCB9 90%)',
        borderRadius: 40,
        border: 0,
        color: 'white',
        height: 44,
        padding: '0 40px',
        boxShadow: '0 3px 5px 2px rgba(79, 84, 87, 0.3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#5F7B86',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#5F7B86',
        },
        '& .MuiOutlinedInput-root': {
            // '& fieldset': {
            //   borderColor: '#5F7B86',
            // },
            '&:hover fieldset': {
                borderColor: '#5F7B86',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#5F7B86',
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
        customSynonymsJSON: '{}',
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
    //Error Handling Snackbar
    const [snackBar, setSnackBar] = useState({ type: "error", show: false, message: "" });
    //Error Handling Snackbar
    const handleCloseSnackBar = () => {
    setSnackBar({ type: "error", show: false, message: "" })
    };
    //Onsubmit action
    const handleSubmit = e => {
        e.preventDefault();
        let errorstatus = validateInput(values, customVisible);
        if (errorstatus) {
            setSnackBar({show:true,message:errorstatus});
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
                <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Settings</Typography>
            </div>

            <Grid container spacing={2} style={{ margin: "2em 2em", width: "90%" }}>
                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Synonym Generating Type</Typography>
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
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Auto Generate Synonym Mode</Typography>
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
                            <Box display="flex" p={1} style={{ padding: '0px' }}>
                                <Box p={1} flexGrow={1} style={{ padding: '0px' }}>
                                    <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Custom Synonyms</Typography>
                                </Box>
                                <Box p={1} style={{ padding: '0px' }}>
                                    <CssTextField className={classes.hiddenInput} id="contained-button-JSONfile" name="uploadJSONFileHidden" type="file" onChange={handleInputchange} />
                                    <label htmlFor="contained-button-JSONfile">
                                        <Button style={{ backgroundColor: 'Transparent', padding: "0px" }} component="span">
                                            <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Upload JSON</Typography>
                                        </Button>
                                    </label>
                                </Box>
                            </Box>
                            <div>
                                <CssTextField id="outlined-multiline-static"
                                    placeholder=""
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="dense"
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
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Remove Unimportant Words</Typography>
                    </div>
                    <div>
                        <CssTextField id="outlined-full-width"
                            placeholder="Require comma separated values"
                            name="removeUnimportantWords"
                            value={values.removeUnimportantWords}
                            onChange={handleInputchange}
                            fullWidth
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Output Utterance Type</Typography>
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
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Max/Min Length of each cluster</Typography>
                    </div>
                    <div>
                        <CssTextField id="outlined-full-width"
                            placeholder=""
                            fullWidth
                            margin="dense"
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
                    {snackBar.show?
                        <SnackBarComponent open={snackBar.show}
                         type={snackBar.type}
                        message={snackBar.message}
                        callBack={handleCloseSnackBar} />
                        :null}
                </div>
            </Grid>

        </div>
    );
}


//Validation of advance setting

function validateInput(values, customVisible) {
    if (customVisible) {
        if (values.uploadJSONFileHidden && (!(/\.(json)$/i).test(values.uploadJSONFileHidden))) {
            return "Please upload file in JSON format."
        }
        if ((!values.customSynonymsJSON)) {
            return "Please enter json file.";
        }
        if (!isDict(values.customSynonymsJSON)) {
            return "Please upload file in JSON format.";
        }
    }
    if ((values.removeUnimportantWords) && (!checkisArray(values.removeUnimportantWords))) {
        return "Remove unimportant word must be an array.Please enter array";
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
            return "Please enter float value with one precision state."
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