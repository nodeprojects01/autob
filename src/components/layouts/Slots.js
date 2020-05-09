import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract_1.jpg'
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import AdvSettings from '../AdvSettings';
import BeginForm from '../BeginForm';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Slots() {
    const classes = useStyles();
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
            padding: "3em 0 0 0",
        }}>
            <Box display="flex" justifyContent="flex-end" style={{width:"100%",
                    borderRadius: "32px 0 0 0"}}>
                <Box style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    minHeight: "100%",
                    width: "95%",
                    textAlign: "left"
                    // boxShadow:"rgb(68, 105, 123, 0.6) -7px -5px 15px"
                }}>

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>xs=12</Paper>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
}
