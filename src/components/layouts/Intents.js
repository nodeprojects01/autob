import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract_1.jpg'
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SlotCard from '../SlotCard';


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
            <Box display="flex" justifyContent="flex-end" style={{ width: "100%" }}>
                <Box style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "32px 0 0 0",
                    minHeight: "100%",
                    width: "96%",
                    textAlign: "left"
                    // boxShadow:"rgb(68, 105, 123, 0.6) -7px -5px 15px"
                }}>

                    <Grid item xs={12}>
                        <div style={{ padding: "1.7em 2em", height: "80vh" }}>
                            <div>
                                <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Identify Intents</Typography>
                            </div>

                            <div style={{ margin: "2em 2em" }}>
                                <Grid container justify="left" spacing={2}>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
}
