import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import image1 from '../images/abstract.jpg'
import '../index.css'

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
    inputFocused: {}
}));


export default function BeginForm(props) {
    const classes = useStyles();
    return (
        <div style={{ padding: "2em", height:"80vh" }}>
            <div>
                <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Let's Begin</Typography>
            </div>

            <div style={{ margin: "2em 2em" }}>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <Typography style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em"}}>Botname</Typography>
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
                        <Typography style={{color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em"}}>Upload Excel</Typography>
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
                    <br></br>
                    <div>
                        <StyledButton onClick={() => { props.onClick() }}>Next</StyledButton>
                    </div>
                </form>
            </div>
        </div>
    );
}