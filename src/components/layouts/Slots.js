import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract.jpg';
import SlotCard from '../SlotCard';


const slotValues = [
  {
    "value": "actionType",
    "synonyms": ["add", "remove", "register", "signup"]
  },
  {
    "value": "bankNames",
    "synonyms": ["hdfc", "axis", "citi", "indus"]
  },
  {
    "value": "cityNames",
    "synonyms": ["bangalore", "hydrabad", "mumbai", "delhi", "bopal", "ahmadabad"]
  },
  {
    "value": "riverNames",
    "synonyms": ["ganga", "yamuna", "tunga"]
  },
  {
    "value": "cityNames",
    "synonyms": ["bangalore", "hydrabad", "mumbai", "delhi", "bopal", "ahmadabad"]
  },
  {
    "value": "riverNames",
    "synonyms": ["ganga", "yamuna", "tunga"]
  }
]

export default function Slots() {

  return (
    <Grid container style={{
      // backgroundColor: "#4F5457" 
      backgroundImage: `url(${image1})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      padding: "3em 0 0 0",
    }}>
      <Box display="flex" justifyContent="flex-end" >
        <Box style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "32px 0 0 0",
          width: "96%",
          textAlign: "left"
          // boxShadow:"rgb(68, 105, 123, 0.6) -7px -5px 15px"
        }}>

          <Grid item xs={12}>
            <div style={{ padding: "1.7em 2em" }}>
              <div>
                <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Identify Slots</Typography>
              </div>

              <div style={{ margin: "2em 2em" }}>
                <Grid container justify="left" spacing={2}>
                  {slotValues.map((value) => (
                    <Grid key={value.value} item md={4} lg={4}>
                      <SlotCard slotValues={value}></SlotCard>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
