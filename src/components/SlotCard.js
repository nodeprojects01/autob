import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SlotValueChip from './SlotValueChip';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
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


export default function SlotCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent style={{padding:"1px"}}>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* {props.slotValues.map((value) => (<SlotValueChip enumVal={value} />))} */}
          <SlotValueChip enumVal={props.slotValues} />
        </Typography>
      </CardContent>
    </Card>
  );
}
