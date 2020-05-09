import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import image1 from '../images/abstract.jpg'
import Slide from "@material-ui/core/Slide";
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import AdvSettings from './AdvSettings';
import BeginForm from './BeginForm';


const useStyles = makeStyles((theme) => ({
    paper: {
        zIndex: 1,
        position: 'absolute',
        top: "3em",
        // margin: theme.spacing(1),
    },
    inputLabel: {
        color: "lightgray",
        "&$inputFocused": {
            color: "orange"
        }
    },
    inputFocused: {}
}));

export default function Layout() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <Grid container style={{
            // backgroundColor: "#4F5457" 
            backgroundImage: `url(${image1})`,
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
            padding: "3em 0 0 0"
        }}>
            <Grid item xs={12} sm={6}>
                <Box bgcolor="rgba(79, 84, 87, 0)" color="primary.contrastText" style={{ minHeight: "100%" }}>
                    <div style={{ padding: "2em" }}>
                        <div style={{
                            position: "fixed",
                            top: "-12%", margin: "25% 15%", border: "2px solid #fff", padding: "1em"
                        }}>
                            <Typography variant="h5" className="text-flicker-in-glow" style={{ color: "#FFF", fontWeight: "bold", letterSpacing: "5px" }}>AUTOB</Typography>
                        </div>
                    </div>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box color="secondary.contrastText" style={{
                    borderRadius: "32px 0 0 0",
                    background: "rgba(255, 255, 255, 0.9)",
                    minHeight: "100%",
                    textAlign: "left"
                }}>


                    {checked ?
                        <Fade in={checked}>
                            {/* <Paper elevation={4} className={classes.paper} style={{ height: "90%", width: "50%", borderRadius: "32px 0 0 0" }}> */}
                            <AdvSettings onClick={handleChange}></AdvSettings>
                            {/* </Paper> */}
                        </Fade>
                        :
                        <Fade in={!checked}>
                            <Paper elevation={40} className={classes.paper} style={{ width: "50%", background: "rgba(255, 255, 255, 0.1)", borderRadius: "32px 0 0 0" }}>
                                <BeginForm onClick={handleChange}></BeginForm>
                            </Paper>
                        </Fade>
                    }
                </Box>
            </Grid>
        </Grid>
    );
}
