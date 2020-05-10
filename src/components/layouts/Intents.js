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
    paper: {
        zIndex: 1,
        position: 'absolute',
        top: "3em"
    },
    inputLabel: {
        color: "lightgray",
        "&$inputFocused": {
            color: "orange"
        }
    },
    inputFocused: {}
}));

export default function Intents() {
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
            padding: "3em 0 0 0",
        }}>

            <Box color="secondary.contrastText" style={{
                borderRadius: "32px 0 0 0",
                background: "rgba(255, 255, 255, 0.9)",
                minHeight: "100%",
                textAlign: "left"
                // boxShadow:"rgb(68, 105, 123, 0.6) -7px -5px 15px"
            }}>
                <Grid>
                    
                </Grid>
            </Box>
        </Grid>
    );
}