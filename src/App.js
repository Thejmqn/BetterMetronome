import { useState, useEffect } from 'react'
import { Button, Slider, ToggleButton, ToggleButtonGroup, FormControl, MenuItem, Select } from '@mui/material'
import { TableContainer, Table, TextField, TableBody, TableCell, TableHead, TableRow, InputLabel } from '@mui/material'
import './App.css';
import audio1 from './downbeat.mp3'
import audio2 from './offbeat.mp3'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Stop from '@mui/icons-material/Stop';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Add from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {
  const [timeSignature, setTimeSignature] = useState(4)
  const [bpm, setBpm] = useState(60);
  const [beat, setBeat] = useState(1);
  const [measure, setMeasure] = useState(1);
  const [running, setRunning] = useState(false);
  const [volume, setVolume] = useState(true);
  const [view, setView] = useState(4);
  const [id, setId] = useState(1);
  const [tempMeasure, setTempMeasure] = useState(1);
  const [tempType, setTempType] = useState("Tempo");
  const [tempValue, setTempValue] = useState(0);
  const downbeat = new Audio(audio1);
  const offbeat = new Audio(audio2);
  const [rows, setRows] = useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if(running) {
        setBeat(beat => beat + 1);
        if(beat >= timeSignature) {
          setBeat(1)
          setMeasure(measure => measure + 1)
          if(volume)
            downbeat.play()
        }
        else {
          offbeat.pause()
          downbeat.pause()
          if(volume)
            offbeat.play()
        }
      }
    }, (60/bpm)*1000);

    for(let i = 0; i < rows.length; i++) {
      if(rows[i].measure == measure) {
        switch(rows[i].type) {
        case("Tempo"):
          setBpm(rows[i].value)
        }
      } 
    }

    return () => clearInterval(interval);
  }, [beat, measure, running, rows]);

const stopButtonClick = () => {
  setRunning(!running)
  return running ? "Start" : "Stop";
}

function createData(id, measure, type, value) {
  return { id, measure, type, value };
}

const reset = () => {
  setBeat(1);
  setMeasure(1);
  setRunning(false);
}

const sliderChange = (event, newValue) => {
  setBpm(newValue);
};

const timeSignatureChange = (event, newTimeSignature) => {
  setTimeSignature(newTimeSignature);
  setView(newTimeSignature);
}

const append = () => {
  rows.push(createData(id, tempMeasure, tempType, tempValue));
  setRows(rows);
  setId(id => id + 1);
}

const selectChange = (event) => {
  setTempType(event.target.value)
}

return (
  <ThemeProvider theme={darkTheme}><CssBaseline>
  <div className="App">
  <div className = "leftColumn">
    <TableContainer sx={{height:"50vh"}}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">ID</TableCell>
          <TableCell>Measure</TableCell>
          <TableCell align="center">Change Type</TableCell>
          <TableCell align="right">New Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
          >
            <TableCell scope="center">{row.id}</TableCell>
            <TableCell scope="row">{row.measure}</TableCell>
            <TableCell align="center">{row.type}</TableCell>
            <TableCell align="right">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
    <TextField
      id="outlined-uncontrolled"
      label="Measure"
      value={tempMeasure}
      onChange={(v) => {
        let change = v.target.value;
        if(!isNaN(change) && change >= 0)
          setTempMeasure(change);
      } }
    />
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Change Type</InputLabel>
      <Select
        default={10}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Change Type"
        value={tempType}
        onChange={selectChange}
      >
        <MenuItem value="Tempo">Tempo</MenuItem>
        <MenuItem value="Time Signature">Time Signature</MenuItem>
        <MenuItem value="Key">Key</MenuItem>
      </Select>
    </FormControl>
    <TextField
      id="outlined-uncontrolled"
      label="Value"
      value={tempValue}
      onChange= {(v) => {
        let change = v.target.value;
        if(!isNaN(change) && change >= 0)
          setTempValue(change);
      } }
    />
    <br></br>
    <Button 
      onClick={append} 
      variant={'contained'}
      color={'primary'}
      size={'large'}
      startIcon={<Add />}>
      Insert Value
    </Button>
    </div>
    <div className="middleColumn"></div>
    <div className="rightColumn">
    <ToggleButtonGroup 
      size="large" 
      exclusive
      value={view} 
      onChange={timeSignatureChange}
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
    <br></br>
    <button className = "CenterButton"
    style={beat == 1 ? {backgroundColor: "darkBlue"} : {backgroundColor: "darkRed"}}>
      { beat == 1 ? measure : beat }
    </button>
    <br></br>
    <Button 
      onClick={stopButtonClick} 
      variant={'contained'}
      color={running ? 'secondary' : 'primary'}
      size={'large'}
      startIcon={running ? <Stop /> : <PlayArrow />}>
      { running ? "Stop" : "Start" }
    </Button>
    <Button 
      onClick={() => setVolume(!volume)} 
      variant={'contained'}
      color={volume ? 'success' : 'error'}
      size={'large'}
      startIcon={volume ? <VolumeUpIcon /> : <VolumeOffIcon />}>
      { volume ? "Mute" : "Unmute" }
    </Button>
    <Slider
      color={'secondary'} 
      value={Number(bpm)}
      step = {2}
      min={30}
      max={200} 
      aria-label="Default" 
      valueLabelDisplay="auto" 
      onChangeCommitted={ sliderChange }
    />
    <Button 
      onClick={ reset } 
      color={'error'}
      size={'large'}
      startIcon={ <RestartAltIcon /> }>
      { "Reset" }
    </Button>
  </div>
  </div>
  </CssBaseline></ThemeProvider>
);
}