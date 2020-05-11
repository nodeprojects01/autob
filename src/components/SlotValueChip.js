import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 352,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));


const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiAutocomplete: {
            // Name of the rule
            text: {
                // Some CSS
                color: 'red',
            },
        },
    },
});



export default function SlotValueChip(props) {
    const classes = useStyles();

    console.log("slotvalue", props)
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={props.enumVal.synonyms}
                    defaultValue={props.enumVal.synonyms}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip key={option} variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} margin="normal" variant="outlined"
                            label="synonyms" placeholder="synonyms" />
                    )}
                />
            </ThemeProvider>
        </div>
    );
}

