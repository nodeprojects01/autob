import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CAutocomplete from './CAutocomplete';
import CTextField from './CTextField';
import { appStyle, appTheme } from '../styles/global'
import Badge from '@material-ui/core/Badge';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';



export default function SlotCard(props) {
  return (

    <Badge badgeContent={<CheckCircleRoundedIcon onClick={props.onClickDisable} style={((props.disabled != null) && (props.disabled.includes(props.slotValues.value))) ?
                 {color: appStyle.colorOffBlack}
                 : 
                 {color: appStyle.colorGreyLight}} />} >
      <Card>
        <CardContent style={((props.disabled != null) && (props.disabled.includes(props.slotValues.value))) ?
          {
            padding: "1em", pointerEvents: "none",
            opacity: 0.4
          } :
          { padding: "1em" }} >
          <div>
            <CTextField name={props.name} onChange={props.onChange} value={props.slotValues.value} />
          </div>
          <CAutocomplete options={[]} label="Synonyms" value={props.slotValues.synonyms} onChange={props.onChange} placeholder="synonyms" />
        </CardContent>

      </Card>
    </Badge>
  );
}
