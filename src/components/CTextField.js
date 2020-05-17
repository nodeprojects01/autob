import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { appStyle, appTheme } from '../styles/global';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: appStyle.colorBlueGreyDark,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: appStyle.colorBlueGreyDark,
        },
        '& .MuiOutlinedInput-inputMarginDense': {
            padding: "1em"
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

export default function CTextField(props) {

    return (
        <div>
            <CssTextField
                id="outlined-full-width"
                select={props.select ? true : false}
                multiline={props.multiline ? true : false}
                rows={props.rows}
                placeholder={props.placeholder}
                fullWidth
                name={props.name}
                value={props.value}
                margin="dense"
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
                InputProps={
                    props.multiline ?
                        {
                            style: {
                                color: appStyle.colorOffBlack,
                                fontSize: appStyle.fontSizeDefault,
                                lineHeight: "2.3"
                            }
                        }
                        :
                        {
                            style: appTheme.textDefault
                        }
                }
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            > {props.select ? props.children : ""} </CssTextField>
        </div>
    )
}