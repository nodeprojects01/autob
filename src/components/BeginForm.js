import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import image1 from '../images/abstract.jpg'
import '../index.css'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';



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


export default function BeginForm(props) {
    const classes = useStyles();
    const [values, setValues] = useState({ botName: "", uploadExcelFile: "" })
    const [errorMessage, setErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleInputchange = (e) => {
        const { name, value } = e.target
        console.log(name, "+", value);
        if (name === "uploadExcelFileHidden") {
            const filename = e.target.files[0].name;
            values.uploadExcelFile = filename;
        }
        setValues({ ...values, [name]: value })
    }
    //Error Handling Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
        setErrorMessage('');
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    //Onsubmit action
    const handleSubmit = e => {
        e.preventDefault();
        let errorstatus = validateInput(values);
        if (errorstatus) {
            setErrorMessage(errorstatus);
            setOpen(true);
        }
        else {
            //Or go to next page or any other operation
            props.onClick();
        }
    }

    return (
        <div style={{ padding: "2em", height: "80vh" }}>
            <div>
                <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Let's Begin</Typography>
            </div>

            <div style={{ margin: "2em 2em" }}>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Botname</Typography>
                    </div>
                    <div>
                        <CssTextField id="outlined-full-width"
                            placeholder=""
                            fullWidth
                            name="botName" value={values.botName} onChange={handleInputchange}
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <br></br>
                    <Box display="flex" p={1} style={{ padding: '0px' }}>
                        <Box p={1} flexGrow={1} style={{ padding: '0px' }}>
                            <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Upload Excel</Typography>
                        </Box>
                        <Box p={1} style={{ padding: '0px' }}>
                            <CssTextField className={classes.hiddenInput} id="contained-button-Excelfile" name="uploadExcelFileHidden" type="file" onChange={handleInputchange} />
                            <label htmlFor="contained-button-Excelfile">
                                <Button style={{ backgroundColor: 'Transparent', padding: "0px" }} component="span">
                                    <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Upload Excel</Typography>
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
                            value={values.uploadExcelFile}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onChange={handleInputchange}
                        />
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                        <StyledButton onClick={handleSubmit} >Next</StyledButton>
                        {/* onClick={() => { props.onClick() }} */}
                        {(errorMessage.length > 0) ?
                            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error">
                                    {errorMessage}
                                </Alert>
                            </Snackbar>
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
        if ((values.botName).search(" ") > -1)  {
            return "Botname is alphanumeric. Must not contain any space. ex- myfirst_bot 01";
        }
    }
    else {
        return "Botname is required";
    }

    if (values.uploadExcelFile) {
        if (!(/\.(xls[mx]?)$/i).test(values.uploadExcelFile)) {
            return "Please upload file in Excel format."
        }
    }
    else {
        return "Excel File is required.";
    }
}