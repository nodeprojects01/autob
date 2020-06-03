import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract.jpg';
import { appStyle, appTheme } from '../../styles/global';
import * as XLSX from 'xlsx';
import { getExcelData, setExcelData } from '../../global/appVariable';
import CButton from '../CButton';
import createBotFiles from '../../botModel/lex/createBotFiles';
import appVariable from '../../global/appVariable';
import PostCard from '../PostCard';

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


const onDownload = async () => {
    console.log("download start");
    // let downloadResult = await createBotFiles.createBotFiles(appVariable.getSlots(),appVariable.getIntents());
    // const blob = await downloadResult.blob();
    // saveAs(blob, "downloaded.zip");
    await createBotFiles(appVariable.getSlots(), appVariable.getIntents());
    console.log("onClick start");
};

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
        maxMinLengthCluster: '0.6/0.2',
        uploadJSONFileHidden: '',
        customVisible: false
    })


    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    const uploadExcelFileData = (e) => {
        var files = e.target.files, f = files[0];
        const reader = new FileReader();
        reader.onload = (e) => { // evt = on_file_select event
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws).split('\n');
            // const data = XLSX.utils.sheet_to_csv(ws, {header:1});
            /* Update state */
            setExcelData(data)
        };
        reader.readAsBinaryString(f);
    }

    const handleInputchange = (e) => {
        const { name, value } = e.target
        console.log(name, "+", value);
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
                console.log(e.target)
                console.log(file)
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
    console.log(values);
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
                        <Box textAlign="center" style={{ margin:"5em 2em 0 2em",
                            border: "2px solid #fff", padding: "1em 7em"
                        }}>
                            <Typography variant="h5" style={appTheme.textAutob}>AUTOB</Typography>
                        </Box>
                        {/* <Box justifyContent="center">
                            <PostCard />
                        </Box> */}
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

                    <div style={{ padding: "2em", height: "80vh" }}>
                        <div>
                            <Typography style={appTheme.textHeader}>Here You Go!</Typography>
                        </div>

                        <div style={{ margin: "2em" }}>
                            <Box >
                                <CButton name="Download Excel File" style={{ width: "100%", height: "4em" }} />
                            </Box>
                            <Box textAlign="center" m={3}>
                                <Typography style={appTheme.textDefault}>OR</Typography>
                            </Box>
                            <Box style={{
                                margin: "1em 0", padding: "0 1.5em 1.5em", border: "1px solid #dde3e1",
                                borderRadius: "5px", borderTop: "3px solid #ccd5d2", background: "#f6f8f7"
                            }}>
                                <Box textAlign="center" m={3}>
                                    <Typography style={appTheme.textSubHeader}>Create Bot Files</Typography>
                                </Box>
                                <Grid container spacing={2}>
                                    <Grid item lg={6}>
                                        <CButton onClick={onDownload} style={{ width: "100%" }} name="LEX" />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <CButton onClick={() => { console.log("New Page") }} style={{ width: "100%" }} name="LUIS" />
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </div>
                </Box>
            </Grid>

        </Grid >
    );
}

