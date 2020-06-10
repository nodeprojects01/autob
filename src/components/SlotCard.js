import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CAutocomplete from './CAutocomplete';
import CTextField from './CTextField';
import { appStyle, appTheme } from '../styles/global'
import Badge from '@material-ui/core/Badge';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
}));

export default function SlotCard(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Badge badgeContent={<CheckCircleRoundedIcon onClick={props.onClickDisable} style={((props.disabled != null) && (props.disabled.includes(props.slotValues.value))) ?
        { color: appStyle.colorRed }
        :
        { color: appStyle.colorGreyLight }} />} >
        <Card container style={{ width: "100%" }}>
          <CardContent style={((props.disabled != null) && (props.disabled.includes(props.slotValues.value))) ?
            {
              padding: "1em", pointerEvents: "none",
              opacity: 0.4
            } :
            { padding: "1em" }} >
            <div>
              <CTextField name={props.name} autoFocus={true} onChange={props.onChange} value={props.slotValues.value} />
            </div>
            <CAutocomplete options={[]} label="Synonyms" value={props.slotValues.synonyms} onChange={props.onChange} placeholder="synonyms" />
          </CardContent>

        </Card>
      </Badge>
    </div >
  );
}
