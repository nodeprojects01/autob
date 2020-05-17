import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CAutocomplete from './CAutocomplete';
import CTextField from './CTextField';
import { appStyle, appTheme } from '../styles/global'


export default function SlotCard(props) {

  return (
    <Card >
      <CardContent style={{ padding: "1em" }}>
        <div>
          <CTextField name="botName" value={props.slotValues.value} />
        </div>
        <CAutocomplete options={[]} label="Synonyms" placeholder="synonyms" defaultValue={props.slotValues.synonyms} />
      </CardContent>
    </Card>
  );
}
