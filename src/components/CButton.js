import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { appStyle, appTheme } from '../styles/global';

const StyledButton = withStyles({
    root: appTheme.buttonDefault,
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default function CButton(props) {
    return (
        <StyledButton style={props.style} onClick={props.onClick}>{props.name}</StyledButton>
    )
}