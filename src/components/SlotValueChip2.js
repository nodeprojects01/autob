import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));


export default function SlotValueChip2(props) {
    const classes = useStyles();
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    console.log("slotvalue", props)
    return (
        <div border="1">
            <div className={classes.root}>
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={props.enumVal.value}
                    defaultValue={[props.enumVal.value]}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip color="primary" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="value" />
                    )}
                />
            </div>
            <div className={classes.root}>
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={props.enumVal.synonyms}
                    defaultValue={[props.enumVal.synonyms]}
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
            </div>
        </div>
    );
}

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 }]