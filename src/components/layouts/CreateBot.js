import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract.jpg';
import { appStyle, appTheme } from '../../styles/global';
import * as XLSX from 'xlsx';
import CButton from '../CButton';
import createBotFiles from '../../botModel/lex/createBotFiles';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import {getSlotValue, getIntentValue} from '../../global/appVariable';

export default function Layout() {
    const history = useHistory();
    
    const onDownload = async () => {
        console.log("download start");
        createBotFiles();
        console.log("onClick start");
    }; 
    const downloadExcelFile=(e)=>{      
        let wb = XLSX.utils.book_new();
        const ws_intent = XLSX.utils.json_to_sheet(intentFormatter());
        const ws_slot = XLSX.utils.json_to_sheet(slotFormatter());
        XLSX.utils.book_append_sheet(wb, ws_intent, 'Cluster Data');
        XLSX.utils.book_append_sheet(wb, ws_slot, 'Slots');
        XLSX.writeFile(wb, 'workbook.xlsx');    
    }
    function intentFormatter() {
        var intent = []
        for (let [key, value] of Object.entries(getIntentValue())) {
            value.map((data) => {
                intent.push({ "Clusters": key, "Utterance": data })
            });
        }
        return intent;
    }
    function slotFormatter() {
        var slots = []   
            getSlotValue().map((data) => {
                data.synonyms.map((synonym) => {
                    slots.push({ "Slots": data.value, "Values": synonym })
                });
            }); 
        return slots;
    }
                
    return (
        <div>
            <Box style={{
                position: "absolute", cursor: "pointer",
                padding: "5px 7px", background: "#FFF",  borderBottomRightRadius:"12px"
            }} onClick={() => {
                history.push({
                    pathname: '/'
                });
            }}>
                <HomeIcon style={{ "color": appStyle.colorGreyLight }} fontSize="small" />
            </Box>
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
                            <Box textAlign="center" style={{
                                margin: "5em 2em 0 2em",
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
                                    <CButton name="Download Excel File" onClick={downloadExcelFile} style={{ width: "100%", height: "4em" }} />
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
        </div>
    );
}

