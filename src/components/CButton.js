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
        <Button style={props.type == "small" ? appTheme.buttonSmall : appTheme.buttonDefault}
            onClick={props.onClick}>{props.name}> </Button>
    )
}