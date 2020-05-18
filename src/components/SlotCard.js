import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CAutocomplete from './CAutocomplete';
import CTextField from './CTextField';
import { appStyle, appTheme } from '../styles/global'


export default function SlotCard(props) {
  return (
    <Card>
          {((props.disabled !=null) && (props.disabled.includes(props.slotValues.value)))?
            (<CardContent style={{ padding: "1em", pointerEvents: "none",
            opacity: 0.4 }} >
            <div>
              <CTextField name={props.name} onChange={props.onChange} value={props.slotValues.value} />
            </div>
            <CAutocomplete options={[]} label="Synonyms" onChange={props.onChange} placeholder="synonyms" defaultValue={props.slotValues.synonyms} />
            </CardContent>)
          :
          (<CardContent style={{ padding: "1em"}} >
          <div>
            <CTextField name={props.name} onChange={props.onChange} value={props.slotValues.value} />
          </div>
          <CAutocomplete options={[]} label="Synonyms" onChange={props.onChange} placeholder="synonyms" defaultValue={props.slotValues.synonyms} />
          </CardContent>)
          }
    </Card>
  );
}
