import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image1 from '../images/abstract.jpg';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));
// const useStyles = makeStyles({
//   root: {
//     maxWidth: 85,
//   },
//   media: {
//     height: 40,
//   },
// });

export default function MediaCard() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
    </div>

    // <Card className={classes.root}>
    //   <CardActionArea>
    //     <CardMedia
    //       className={classes.media}
    //       image={image1}
    //       title="Contemplative Reptile"
    //     />
    //     <CardContent>
    //       <Typography variant="body2" color="textSecondary" component="p">
    //         Ullas Naik
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button size="small" color="primary">
    //       LinkedIn
    //     </Button>
    //   </CardActions>
    // </Card>
  );
}
