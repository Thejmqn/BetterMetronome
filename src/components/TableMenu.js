import { InputLabel, FormControl, MenuItem, Select } from '@mui/material'

export function TypeChange(props) {
  return <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Change Type</InputLabel>
    <Select
      default={10}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Change Type"
      value={props.type}
      onChange={props.changeCall}
    >
      <MenuItem value="Tempo">Tempo</MenuItem>
      <MenuItem value="Rehearsal">Rehearsal Letter</MenuItem>
      <MenuItem value="Time Signature">Time Signature</MenuItem>
      <MenuItem value="Key">Key</MenuItem>
    </Select>
  </FormControl>
}