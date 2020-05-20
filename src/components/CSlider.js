import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { appStyle, appTheme } from '../styles/global';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSlider-root':{
        color: appStyle.colorBlueGreyDark
    },
    width: 200,
    color: appStyle.colorBlueGreyDark
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: 'Loose',
  },
  {
    value: 50,
    label: 'Moderate',
  },
  {
    value: 100,
    label: 'Strict',
  },
];

function valuetext(value) {
  console.log(value)
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Typography id="discrete-slider-custom" gutterBottom>
        Autogenerate Synonym Mode
      </Typography> */}
      <Slider
        defaultValue={50}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={50}
        marks={marks}
      />
    </div>
  );
}