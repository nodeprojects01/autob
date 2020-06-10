// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Popper from '@material-ui/core/Popper';
// import SettingsIcon from '@material-ui/icons/Settings';
// import Fade from '@material-ui/core/Fade';
// import Paper from '@material-ui/core/Paper';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: 500,
//     },
//     typography: {
//         padding: theme.spacing(2),
//     },
// }));

// export default function PositionedPopper() {
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [open, setOpen] = React.useState(false);
//     const [placement, setPlacement] = React.useState();
//     const classes = useStyles();

//     const handlePopperClick = (newPlacement) => (event) => {
//         setAnchorEl(event.currentTarget);
//         setOpen((prev) => placement !== newPlacement || !prev);
//         setPlacement(newPlacement);
//     };

//     return (
//         <div className={classes.root}>
//             <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
//                 {({ TransitionProps }) => (
//                     <Fade {...TransitionProps} timeout={350}>
//                         <Paper>
//                             <CSlider2
//                                 value={updateInputParam["maxMinLengthCluster"].split("/")[0] * 100}
//                                 onChange={onMinMaxChange}
//                                 min={updateInputParam["maxMinLengthCluster"].split("/")[1] * 100 + 10} />
//                             <div>
//                                 <Typography style={appTheme.textDefault}>Each Cluster Min Count</Typography>
//                                 <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
//                                     <AddIcon />
//                                 </Fab>
//                                 <Typography>{minClusterCount}</Typography>
//                                 <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
//                                     <RemoveIcon />
//                                 </Fab>
//                             </div>
//                         </Paper>
//                     </Fade>
//                 )}
//             </Popper>
//             <SettingsIcon onClick={handleClick('left-start')}
//                 style={{ cursor: "pointer", "color": appStyle.colorGreyLight }}
//                 fontSize="small" />
//         </div>
//     );
// }
