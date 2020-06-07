import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { appStyle, appTheme } from '../styles/global';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function PostCard(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{padding:"1em"}}
    >
      <Avatar alt={props.name} src={props.image} className={classes.large} />
      <Typography style={appTheme.textSmallWhite}>{props.name}</Typography>
    </Grid>

  );
}
