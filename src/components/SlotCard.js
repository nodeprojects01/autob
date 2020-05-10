import React from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SlotValueChip from './SlotValueChip';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 5,
  },
});

const CssTextField = withStyles({
  root: {
      '& label.Mui-focused': {
          color: 'transparent',
      },
      '& .MuiInput-underline:after': {
          borderBottomColor: 'transparent',
      },
      '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#5F7B86',
          },
          '&:hover fieldset': {
              borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
              borderColor: 'transparent',
          },
      },
  },
})(TextField);

export default function SlotCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent style={{ padding: "1px" }}>
        <div style={{padding:"1em 1.2em 0"}}>
          <CssTextField id="standard-basic"
            placeholder=""
            fullWidth
            margin="dense"
            size="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* {props.slotValues.map((value) => (<SlotValueChip enumVal={value} />))} */}
          <SlotValueChip enumVal={props.slotValues} />
        </Typography>
      </CardContent>
    </Card>
  );
}
