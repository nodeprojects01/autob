import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract.jpg'
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import AdvSettings from '../AdvSettings';
import BeginForm from '../BeginForm';
import { appStyle, appTheme } from '../../styles/global';
import * as XLSX from 'xlsx';
import { setExcelData } from '../../global/appVariable'

const useStyles = makeStyles((theme) => ({
    paper: {
        zIndex: 1,
        position: 'absolute',
        top: "3em"
    },
    inputLabel: {
        color: "lightgray",
        "&$inputFocused": {
            color: "orange"
        }
    },
    inputFocused: {}
}));


export default function Layout() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const [values, setValues] = useState({
        botName: "",
        uploadExcelFile: "",
        synonymGenerating: 'auto_generate_synonyms',
        customSynonymsJSON: '',
        autoGenerateSynonymMode: 'moderate',
        removeUnimportantWords: '',
        outputUtterance: 'alphanumeric',
        maxMinLengthCluster: '0.4/0.1',
        uploadJSONFileHidden: '',
        eachClusterMinCount: 2,
        customVisible: false
    })


    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    const uploadExcelFileData = (e) => {
        var files = e.target.files, f = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws).split('\n');
            // const data = XLSX.utils.sheet_to_csv(ws, {header:1});
            setExcelData(data)
        };
        reader.readAsBinaryString(f);
    }

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        if (name === "uploadExcelFileHidden") {
            const filename = e.target.files[0].name;
            values.uploadExcelFile = filename;
            uploadExcelFileData(e)
        }
        if (name === "synonymGenerating") {
            if (value === "custom_synonyms")
                values.customVisible = true;
            else
                values.customVisible = false;
        }
        if ((name === "uploadJSONFileHidden")) {
            if ((/\.(json)$/i).test(value)) {
                let file = e.target.files[0];
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function (e) {
                    const content = reader.result;
                    setValues({ ...values, customSynonymsJSON: content, uploadJSONFileHidden: value })
                }
            }
            else {
                values.customSynonymsJSON = '';
            }
        }
        setValues({ ...values, [name]: value })
    }

    return (
        <Grid container style={{
            // backgroundColor: "#4F5457" 
            backgroundImage: `url(${image1})`,
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
            padding: "3em 0 0 0",
        }}>
            <Grid item xs={12} sm={6}>
                <Box color="primary.contrastText" style={{
                    // background: "rgba(79, 84, 87, 0.8)", 
                    minHeight: "100%"
                }}>
                    <div style={{ padding: "2em" }}>
                        <div style={{ position: "fixed", top: "42%", left: "11%" }}>
                            <div style={{ border: "2px solid #fff", padding: "1em 7em" }}>
                                <Typography variant="h5" style={appTheme.textAutob}>AUTOB</Typography>
                            </div>
                            {/* {showAbout ? */}
                            <div>
                                <Box textAlign="center" style={{ margin: "1em 0 0 0" }}>
                                    <Typography style={appTheme.textSmallWhite}>
                                        Automatically clean up the utterances and<br />
                                            generates the possible clusters and slots, <br />
                                            making it easier to merge those clusters together<br />
                                            to form as many intents as you need <br />
                                            to feed a chatbot.
                                    {/* <span style={appTheme.textDefault}><b>Automatically</b></span> clean up the utterances and<br />
                                            generates the possible <span style={appTheme.textDefault}><b>clusters and slots,</b></span> <br />
                                            makes it easier to merge those clusters together<br />
                                            <span style={appTheme.textDefault}><b>to</b></span> form as many intents as you need <br />
                                            to feed a <span style={appTheme.textDefault}><b>chatbot</b></span>. */}
                                    </Typography>
                                </Box>
                            </div>
                            {/* : ""} */}
                        </div>
                    </div>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box color="secondary.contrastText" style={{
                    borderRadius: "32px 0 0 0",
                    background: "rgba(255, 255, 255, 0.9)",
                    minHeight: "100%",
                    textAlign: "left"
                    // boxShadow:"rgb(68, 105, 123, 0.6) -7px -5px 15px"
                }}>
                    {checked ?
                        <Fade in={checked}>
                            <AdvSettings values={values} setValues={(e) => { handleInputchange(e) }}
                                onClick={handleChange}></AdvSettings>
                        </Fade>
                        :
                        <Fade in={!checked}>
                            <Paper elevation={40} className={classes.paper}
                                style={{
                                    width: "50%", background: "rgba(255, 255, 255, 0.1)",
                                    borderRadius: "32px 0 0 0"
                                }}>
                                <BeginForm values={values} setValues={(e) => { handleInputchange(e) }}
                                    onClick={handleChange}></BeginForm>
                            </Paper>
                        </Fade>
                    }
                </Box>
            </Grid>

        </Grid>
    );
}

