import { InputLabel, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { MeasureButtons } from './Buttons';

export function TypeChange(props) {
  return <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Change Type</InputLabel>
    <Select
      default={10}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Change Type"
      value={props.type}
      onChange={props.onChange}
    >
      <MenuItem value="Tempo">Tempo</MenuItem>
      <MenuItem value="Rehearsal">Rehearsal Letter</MenuItem>
      <MenuItem value="Time">Time Signature</MenuItem>
      <MenuItem value="Key">Key</MenuItem>
    </Select>
  </FormControl>
}

export function ValueBox(props) {
  switch (props.state) {
    case "Tempo":
      return <TextField
      id="outlined-uncontrolled"
      label="New Tempo"
      value={props.value}
      onChange={props.onChange}
    />
    case "Rehearsal":
      return <TextField
      id="outlined-uncontrolled"
      label="Rehearsal Mark"
      value={props.value}
      onChange={props.onChange}
    />
    case "Time":
      return <MeasureButtons timeSignature={props.value} onChange={props.onChange}/>
    default:
      console.log(props.state)
  }
}