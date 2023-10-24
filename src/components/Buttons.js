import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import Add from '@mui/icons-material/Add';
import Stop from '@mui/icons-material/Stop';
import PlayArrow from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BorderClear from '@mui/icons-material/BorderClear';

export function AddButton(props) {
    return <Button 
        onClick={props.onClick} 
        variant={'contained'}
        color={'primary'}
        size={'large'}
        startIcon={<Add />}>
        Insert Value
    </Button>
}

export function StopButton(props) {
    return <Button 
      onClick={props.onClick} 
      variant={'contained'}
      color={props.running ? 'secondary' : 'primary'}
      size={'large'}
      startIcon={props.running ? <Stop /> : <PlayArrow />}>
      { props.running ? "Stop" : "Start" }
    </Button>
}

export function VolumeButton(props) {
    return <Button 
      onClick={props.onClick} 
      variant={'contained'}
      color={props.volume ? 'success' : 'error'}
      size={'large'}
      startIcon={props.volume ? <VolumeUpIcon /> : <VolumeOffIcon />}>
      { props.volume ? "Mute" : "Unmute" }
    </Button>
}

export function ResetMetronomeButton(props) {
    return <Button 
    onClick={ props.onClick } 
    color={'error'}
    size={'large'}
    startIcon={ <RestartAltIcon /> }>
    { "Reset" }
  </Button>
}

export function ResetTableButton(props) {
  return <Button 
  onClick={ props.onClick } 
  color={'error'}
  size={'large'}
  startIcon={ <BorderClear /> }>
  { "Clear Table" }
</Button>
}

export function MeasureButtons(props) {
    return <ToggleButtonGroup 
    size="large" 
    exclusive
    value={props.timeSignature} 
    onChange={props.onChange}
    color="primary"
    fullWidth={true}
  >
    <ToggleButton value={3}>
      3/4
    </ToggleButton>
    <ToggleButton value={4}>
      4/4
    </ToggleButton>
    <ToggleButton value={6}>
      6/8
    </ToggleButton>
  </ToggleButtonGroup>
}
