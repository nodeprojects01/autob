import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { appStyle, appTheme } from '../styles/global';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiSlider-root': {
            color: appStyle.colorBlueGreyDark
        },
        width: "100%",
        color: appStyle.colorBlueGreyDark
    },
    margin: {
        height: theme.spacing(3),
    },
}));


export default function RangeSlider(props) {
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        console.log("new max value", newValue, newValue / 100 + "/" + ((props.min - 10) / 100));
        props.onChange(""+(newValue / 100 ).toFixed(1)+ "/" + ((props.min - 10) / 100)+"");
    };
    
    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom style={appTheme.textDefault}>
                Cluster with {props.value}% Similar Utterances
      </Typography>
            <Slider
                value={props.value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="discrete-slider"
                // getAriaValueText={valuetext}
                step={10}
                marks
                min={props.min}
                max={100}
            />
        </div>
    );
}
