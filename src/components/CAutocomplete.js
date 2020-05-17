
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { appStyle, appTheme } from '../styles/global'


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

export default function CAutocomplete(props) {
    
    return (
        <div>
            {props.options.length >= 1 ?
                <Autocomplete
                    multiple
                    id="tags-filled"
                    value={props.value}
                    onChange={props.onChange}
                    options={props.options}
                    filterSelectedOptions
                    getOptionLabel={option => option}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <Chip
                                label={option}
                                {...getTagProps({ index })}
                                disabled={(props.value).indexOf(option) !== -1}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} margin="normal" variant="outlined"
                            label={props.label} placeholder={props.placeholder} />
                    )}
                />
                :
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={props.options}
                    defaultValue={props.defaultValue}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip key={option} variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} margin="normal" variant="outlined"
                            label={props.label} placeholder={props.placeholder} />
                    )}
                />
            }

        </div>
    );
}

