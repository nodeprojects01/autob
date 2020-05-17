import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SlotValueChip from './SlotValueChip';
import TextField from '@material-ui/core/TextField';
import { appStyle, appTheme } from '../styles/global'


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

export default function SlotCard(props) {

  return (
    <Card >
      <CardContent style={{ padding: "1em" }}>
        <div>
          <CssTextField id="outlined-full-width"
            placeholder=""
            fullWidth
            margin="dense"
            name="botName"
            value={props.slotValues.value}
            // onChange={}
            InputProps={{
              style: appTheme.textDefault
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
        <SlotValueChip enumVal={props.slotValues} />
      </CardContent>
    </Card>
  );
}
