import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Label from '@material-ui/core/FormLabel';


const useStyles = makeStyles(theme => ({
    root:{
        backgroundColor: '#fff',
        height: window.length
    },
    Input: {
    width: '80%',
    marginBottom:"15px"
    },
    input: {
        display: 'none'
    }
}));

export default function ExcelUpdate(){
    const [visible, setVisible] = useState(false);
    const[customVisible, setCustomVisible] = useState(false);
    const classes = useStyles();

    const [values, setValues] = useState({botName: "", uploadExcelFile: "",synonymGenerating: 'auto_generate_synonyms', customSynonymsJSON: '{}',
    autoGenerateSynonymMode: 'moderate',removeUnimportantWords:'',outputUtterance:'alphanumeric',maxMinLengthCluster: '0.6/0.2', uploadJsonFile:''})

    const [errorMessage, setErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleInputchange = (e) => {
        const {name, value} = e.target
        console.log(name,"+",value);
        if(name==="synonymGenerating")
        {
            if(value==="custom_synonyms")
                setCustomVisible(true);
            else
                setCustomVisible(false);
        }
        if((name==="uploadJsonFile") && ((/\.(json)$/i).test(value)))
        {
            let file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(e) {
            const content =reader.result;
            setValues({...values, customSynonymsJSON : content, uploadJsonFile : value})
            }
        }
        if(name==="uploadExcelFileHidden"){
            const filename = e.target.files[0].name;
            values.uploadExcelFile=filename;
        }
        setValues({...values, [name]: value})
    }
    const handleClose = (event, reason) => {
        if (reason=== 'clickaway') {return;}
        setOpen(false);
        setErrorMessage('');
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleSubmit = e => {
        e.preventDefault();
        let errorstatus = validateInput (values,visible,customVisible);
        if(errorstatus){
            setErrorMessage(errorstatus);
            setOpen(true);}
        else{
            console.log("successful");
        }
    }
    return(
        <div className={classes.root} >
            <CssBaseline />
            <Box className={classes.content} style={{ padding: '30px'}}>

                <Grid container spacing={6} justify="center">

                    <Grid container item xs={6}>
                        <Box style={{width: '100%'}}>
                            <Typography >
                                Let's Begin
                            </Typography><br></br>

                            <Typography>Bot Name</Typography>
                            <Input className={classes.Input} type-="text" name="botName" value={values.botName} onChange={handleInputchange} />
                            
                            <Box display="flex" p={1} style={{padding:'0px',width:'80%'}}>
                                <Box p={1} flexGrow={1} style={{padding:'0px'}}>
                                    <Typography >Upload Excel File</Typography>
                                </Box>
                                <Box p={1} style={{padding:'0px'}}>
                                    
                                            
                                    <Input className={classes.input} id="contained-button-Excelfile"  name="uploadExcelFileHidden" type="file" onChange={handleInputchange}/>
                                    <Label htmlFor="contained-button-Excelfile">
                                        <Button  style={{ backgroundColor:'Transparent'}} component="span">Excel</Button>
                                    </Label>
                                </Box>
                            </Box>
                            <Input className={classes.Input} accept="*.xlsx" type="text" name="uploadExcelFile" value={values.uploadExcelFile} onChange={handleInputchange}/>



                            <Typography onClick={()=> setVisible(visible => !visible)} >Advanced Setting</Typography>
                        </Box>
                        <Grid item xs={12}>
                            <Button onClick={handleSubmit} variant="outlined" style={{float:"right",marginTop: '40px'}} size="large" >Next</Button>
                            {(errorMessage.length>0)?
                                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="error">
                                        {errorMessage}
                                    </Alert>
                                </Snackbar>
                                :null}
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} >
                        <Box className={classes.content} style={{padding :"30px",width:'100%'}}>
                        {visible &&
                            <div>
                                <Typography >Synonym Generating Type</Typography>
                                <Select name="synonymGenerating" className={classes.Input} variant="outlined" value={values.synonymGenerating} onChange={handleInputchange}>
                                    <MenuItem value={"auto_generate_synonyms"}>Auto Generate Synonyms</MenuItem>
                                    <MenuItem value={"custom_synonyms"}>Custom Synonyms</MenuItem>
                                    <MenuItem value={"apply_global synonyms"}>Apply Global Synonyms</MenuItem>
                                </Select>
                                {customVisible &&
                                <div>
                                    <Box display="flex" p={1} style={{padding:'0px',width:'80%'}}>
                                        <Box p={1} flexGrow={1} style={{padding:'0px'}}>
                                        <Typography>Custom Synonyms</Typography>
                                        </Box>
                                        <Box p={1} style={{padding:'0px'}}>
                                            <Input className={classes.input} id="contained-button-file"  name="uploadJsonFile" type="file" onChange={handleInputchange}/>
                                            <Label htmlFor="contained-button-file">
                                                <Button variant="contained" style={{ backgroundColor:'Transparent'}} component="span">
                                                    JSON
                                                </Button>
                                            </Label>
                                        </Box>
                                    </Box>

                                    <Input className={classes.Input} type="text" name="customSynonymsJSON" multiline rows={3} value={values.customSynonymsJSON} onChange={handleInputchange}/>
                                </div>}
                            
                                <Typography >Auto Generate Synonym Mode</Typography>
                                <Select name="autoGenerateSynonymMode" className={classes.Input} variant="outlined" value={values.autoGenerateSynonymMode} onChange={handleInputchange}>
                                    <MenuItem value={"strict"}>Strict</MenuItem>
                                    <MenuItem value={"moderate"}>Moderate</MenuItem>
                                    <MenuItem value={"loose"}>Loose</MenuItem>
                                </Select>

                                <Typography >Remove Unimportant Words</Typography>
                                <Input className={classes.Input} type="text" placeholder="Require comma separated values" name="removeUnimportantWords" value={values.removeUnimportantWords} onChange={handleInputchange}/>
                                
                                <Typography >Output Utterance Type</Typography>
                                <Select name="outputUtterance" className={classes.Input} variant="outlined" value={values.outputUtterance} onChange={handleInputchange}>
                                    <MenuItem value={"alphanumeric"}>Alphanumeric</MenuItem>
                                    <MenuItem value={"extract_only text"}>Extract Only text</MenuItem>
                                </Select>

                                <Typography>Max/Min Length of each cluster</Typography>
                                <Input className={classes.Input} type="text" name="maxMinLengthCluster" value={values.maxMinLengthCluster} onChange={handleInputchange}/>
                            </div>
                        }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>);
}

function validateInput (values, visible,customVisible){
    if(values.botName)
    {
        if(((values.botName).search(" ")>-1) || (!((values.botName).search("_")>0))) {
            return "Botname is alphanumeric with underscores. Must not contain any space. ex- myfirst_bot 01";
            }
    }
    else{
        return "Botname is required";
    }

    if(values.uploadExcelFile){
        if(!(/\.(xls[mx]?)$/i).test(values.uploadExcelFile)){
            return "Please upload file in Excel format."
        }
    }
    else{
        return "Excel File is required.";
    }
    if(visible){
        if(customVisible)
        {
            if(values.uploadJsonFile && (!(/\.(json)$/i).test(values.uploadJsonFile))){
                return "Please upload file in JSON format."
            }
            if((!values.customSynonymsJSON)){
                    return "Please enter json file.";
            }
            if(!isDict(values.customSynonymsJSON)){
                    return "Please upload file in JSON format.";
            }
        }
        if((values.removeUnimportantWords) && (!checkisArray(values.removeUnimportantWords))){
            return "Remove unimportant word must be an array.Please enter array";
        }
        if(values.maxMinLengthCluster){
            var [max,min]= ((values.maxMinLengthCluster).split("/"));
            min=parseFloat(min);
            max=parseFloat(max);
            if((min==min.toFixed(1)) && (max==max.toFixed(1))){
                if((0.2<= min)&&(min <=0.9) && (0.2<= max)&&(max <=1.0) ){
                    if(min>max){
                    return "min_utterances_similarity must be less than max_utterances_similarity";
                    }
                }
                else{
                    return "Please Enter 0.2 <= max_utterances_similarity <= 1.0 and 0.2 <= min_utterances_similarity <= 0.9";
                }
            }
            else{
                return "Please enter float value with one precision state."
            }
        }
        else{
            return "Please enter max/min similiarity. Eg-0.6/0.2";
        }
    } 
}
function isDict(v) {
    try{
    if(Object.getPrototypeOf(JSON.parse(v))===Object.prototype)
        return true;
    }
    catch{
        return false;
    }
}

function checkisArray(userInput){
    try{
        if(userInput.search(" ")==0){
            return false;
        }
        var splitting = userInput.split(",");
        if(Object.prototype.toString.call(splitting) === '[object Array]'){
            return true;
        }
    }
    catch{
    return false;
    }
}