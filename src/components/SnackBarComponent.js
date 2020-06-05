import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent'
import clsx from "clsx";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import { appStyle} from '../styles/global'

//in milliseconds
const defaultAutoHideDuration = 5000;

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: appStyle.colorGreen
    },
    error: {
        backgroundColor: appStyle.colorRed
    },
    info: {
        backgroundColor: '#087063'
    },
    warning: {
        backgroundColor: '#fff3e0'
    }
}));

export default function SnackBarComponent(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open);
    const autoHideDuration = props.hasOwnProperty('autoHideDuration') ? props.autoHideDuration : defaultAutoHideDuration
    const handleClose = () => {
        setOpen(false);
        props.callBack();
    };
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={props.hasOwnProperty('autoHideDuration') ? props.autoHideDuration : defaultAutoHideDuration}
                onClose={handleClose}
            >

                <SnackbarContent
                    className={clsx(classes[props.type])}
                    onClose={handleClose}
                    variant={props.type}
                    message={<span id="client-snackbar" style={{ fontFamily: "Roboto,sans-serif" }}>
                        {props.message}
                    </span>}
                    action={
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                />
            </Snackbar>
        </div>
    );
}