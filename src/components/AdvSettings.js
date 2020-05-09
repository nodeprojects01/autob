import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import image1 from '../images/abstract.jpg'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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


export default function AdvSettings(props) {
    const classes = useStyles();
    return (
        <div style={{ padding: "2em" }}>
            <div>
                <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Settings</Typography>
            </div>

            <Grid container spacing={2} style={{ margin: "2em 2em", width: "90%" }}>
                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Botname1</Typography>
                    </div>
                    <div>
                        <CssTextField
                            id="outlined-full-width"
                            select
                            fullWidth
                            margin="dense"
                            value=""
                            variant="outlined"
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
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Botname2</Typography>
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
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div>
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Custom Slots</Typography>
                    </div>
                    <div>
                        <CssTextField id="outlined-multiline-static"
                            placeholder=""
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Botname1</Typography>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Botname2</Typography>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Botname1</Typography>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div>
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "0.8em" }}>Botname2</Typography>
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
                </Grid>

                <br></br>
                <div>
                    <StyledButton onClick={() => { props.onClick() }}>Save</StyledButton>
                </div>
            </Grid>

        </div>
    );
}