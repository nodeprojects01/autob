import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import image1 from '../../images/abstract.jpg';
import SlotCard from '../SlotCard';
import CTextField from '../CTextField';
import CAutocomplete from '../CAutocomplete';
import CSlider from '../CSlider';
import CButton from '../CButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import { grey } from '@material-ui/core/colors';
import { appStyle, appTheme } from '../../styles/global';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import createBotFiles from '../../botModel/lex/createBotFiles';
import appVariable from '../../global/appVariable';
import Container from '@material-ui/core/Container';

const onDownload = async () => {
  console.log("download start");
  // let downloadResult = await createBotFiles.createBotFiles(appVariable.getSlots(),appVariable.getIntents());
  // const blob = await downloadResult.blob();
  // saveAs(blob, "downloaded.zip");
  await createBotFiles(appVariable.getSlots(), appVariable.getIntents());
  console.log("onClick start");
};


export default function CreateBot() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [disableValue, setDisableValue] = React.useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleInputchange = (e, synonymValues, index) => {
    console.log("handleInput")
    const { name, value } = e.target
    console.log(name, "+", value);
  }

  return (
    <Grid container style={{
      // backgroundColor: "#4F5457" 
      backgroundImage: `url(${image1})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      padding: "3em 0 0 0",
      justify: "center",
      minHeight: "100%"
    }}>
      <Container style={{maxWidth:"75%"}}>
        <Box style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "32px 32px 0 0",
          width: "100%",
          textAlign: "left",
          justify: "center",
          minHeight:"100vh"
          // boxShadow:"rgb(68, 105, 123, 0.6) -7px -5px 15px"
        }}>

          <Grid item xs={12}>
            <div style={{ padding: "1.7em 2em" }}>
              <div>
                <Box display="flex">
                  <Box flexGrow={1}>
                    <Typography variant="h5" style={{ color: "#4F5457", fontWeight: "bold" }}>Here You Go!</Typography>
                  </Box>
                </Box>
              </div>

              <div style={{ margin: "2em 2em" }}>
                <Grid xs={12}>
                  <Box p={1}>
                    <CButton name="Download ExcelFile" />
                  </Box>
                  <Box p={1}>
                    <Box flexGrow={1}>
                      <Typography >Create Bot Files</Typography>
                    </Box>
                    <Box display="flex" p={1}>
                      <Box flexGrow={1} p={1}>
                        <CButton onClick={onDownload} name="LEX" />
                      </Box>
                      <Box p={1}>
                        <CButton onClick={() => { console.log("New Page") }} name="LUIS" />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </div>
            </div>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}

