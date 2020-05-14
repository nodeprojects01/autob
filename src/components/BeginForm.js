import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import image1 from '../images/abstract.jpg'
import '../index.css'
import { StylesProvider } from '@material-ui/styles';
import { appStyle, appTheme } from '../styles/global';
import SnackBarComponent from './SnackBarComponent';
import SettingsIcon from '@material-ui/icons/Settings';

{/* <StylesProvider injectFirst>
    content goes here
</StylesProvider> */}


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


export default function BeginForm(props) {
    const classes = useStyles();

    //Error Handling Snackbar
    const [snackBar, setSnackBar] = useState({ type: "error", show: false, message: "" });
    //Error Handling Snackbar
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
            // props.onClick();
        }
    }

    return (
        <div style={{ padding: "2em", height: "80vh" }}>
            <div>
                <Typography variant="h5" style={appTheme.textHeader}>Let's Begin</Typography>
            </div>

            <div style={{ margin: "2em 2em" }}>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <Typography style={appTheme.textSmall}>Botname</Typography>
                    </div>
                    <div>
                        <CssTextField id="outlined-full-width"
                            placeholder=""
                            fullWidth
                            name="botName" value={props.values.botName} onChange={props.handleInputchange}
                            margin="dense"
                            name="botName" value={props.values.botName} onChange={props.setValues}
                            InputProps={{
                                style: appTheme.textDefault
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <br></br>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography style={appTheme.textSmall}>Upload Excel</Typography>
                        </Box>
                        <Box alignSelf="center">
                            <CssTextField className={classes.hiddenInput} id="contained-button-Excelfile"
                                name="uploadExcelFileHidden" type="file" onChange={props.setValues} />
                            <label htmlFor="contained-button-Excelfile">
                                <Button style={{ backgroundColor: 'Transparent', padding: "0px" }} component="span">
                                    <Typography style={appTheme.textSmall}>Browse File</Typography>
                                </Button>
                            </label>
                        </Box>
                    </Box>

                    <div>
                        <CssTextField id="outlined-full-width"
                            placeholder=""
                            fullWidth
                            margin="dense"
                            name="uploadExcelFile"
                            value={props.values.uploadExcelFile}
                            InputProps={{
                                style: appTheme.textDefault
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onChange={props.setValues}
                        />
                    </div>
                    <br></br>
                    <div>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <StyledButton onClick={handleSubmit}>Next</StyledButton>
                            </Box>
                            <Box alignSelf="center" onClick={props.onClick}>
                                <SettingsIcon
                                    style={{ cursor: "pointer", "color": appStyle.colorGreyLight }}
                                    fontSize="small"></SettingsIcon>
                            </Box>
                        </Box>
                        {/* onClick={() => { props.onClick() }} */}
                        {snackBar.show ?
                            <SnackBarComponent open={snackBar.show}
                                type={snackBar.type}
                                message={snackBar.message}
                                callBack={handleCloseSnackBar} />
                            : null}
                    </div>
                </form>
            </div>


        </div>
    );
}


//Validation of botname and ExcelFileUpload
function validateInput(values) {
    if (values.botName) {
        if ((values.botName).search(" ") > -1) {
            return "Botname is alphanumeric, must not contain any spaces. ex- myfirst_bot";
        }
    }
    else {
        return "Botname is required";
    }

    if (values.uploadExcelFile) {
        if (!(/\.(xls[mx]?)$/i).test(values.uploadExcelFile)) {
            return "Please upload only excel file"
        }
    }
    else {
        return "Excel file is required";
    }
}