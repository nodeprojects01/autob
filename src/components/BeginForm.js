import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import image1 from '../images/abstract.jpg'
import '../index.css'
import { StylesProvider } from '@material-ui/styles';
import { appStyle, appTheme } from '../styles/global'

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
    inputFocused: {}
}));


export default function BeginForm(props) {
    const classes = useStyles();

    const onChangeHandler = (event) => {
        console.log(event.target.files[0])
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
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <br></br>
                    <div>
                        <Typography style={appTheme.textSmall}>Upload Excel</Typography>
                    </div>
                    <div>
                        <CssTextField id="outlined-full-width"
                            placeholder="Tasdfsdfasdfsdfdsfest"
                            fullWidth
                            type="file"
                            inputProps={{
                                style: { fontSize: 15 }
                            }}
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                                style: { fontSize: 40 }
                            }}
                            variant="outlined"
                        />
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                        <StyledButton onClick={() => { props.onClick() }}>Next</StyledButton>
                    </div>
                </form>
            </div>
        </div>
    );
}