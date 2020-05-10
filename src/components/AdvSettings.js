import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { appStyle, appTheme } from '../styles/global'

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