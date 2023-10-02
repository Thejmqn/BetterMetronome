import { useState, useEffect } from 'react'
import { createTheme, CssBaseline, TextField, ThemeProvider } from '@mui/material'
import MeasureTable from './components/MeasureTable';
import { TypeChange, ValueBox } from './components/TableMenu';
import { AddButton, MeasureButtons, ResetButton, StopButton, VolumeButton } from './components/Buttons';
import './Main.css';
import audio1 from './audio/downbeat.mp3'
import audio2 from './audio/offbeat.mp3'

export default function App() {
  const [timeSignature, setTimeSignature] = useState(4)
  const [bpm, setBpm] = useState(112);
  const [beat, setBeat] = useState(1);
  const [measure, setMeasure] = useState(1);
  const [running, setRunning] = useState(false);
  const [volume, setVolume] = useState(true);
  const [id, setId] = useState(1);
  const [tempMeasure, setTempMeasure] = useState(1);
  const [tempType, setTempType] = useState("Tempo");
  const [tempValue, setTempValue] = useState(0);
  const downbeat = new Audio(audio1);
  const offbeat = new Audio(audio2);
  const [rows, setRows] = useState([]);
  const [letters, setLetters] = useState([]);
  const [buttonText, setButtonText] = useState("1");
  const [buttonColor, setButtonColor] = useState("darkBlue");

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if(running) {
        if(beat < timeSignature) {
          setBeat(beat => beat + 1)
          if(volume)
            offbeat.play()
        } 
        else {
          setBeat(1)
          setMeasure(measure => measure + 1)
          if(volume)
            downbeat.play()
        }
      }
    }, (60/bpm)*1000);

    for(let i = 0; i < rows.length; i++) {
      if(rows[i].measure === measure) {
        switch(rows[i].type) {
        case("Tempo"):
          setBpm(rows[i].value);
          break;
        default:
          console.log("Unsupported Type. Id: " + rows[i].id);
        }
      } 
    }

    setButtonText(calculateButtonText)
    setButtonColor(calculateButtonColor)

    return () => clearInterval(interval);
  }, [beat, measure, running, rows]);

const calculateButtonText = () => {
  if (beat === 1) {
    for(let i = 0; i < letters.length; i++) {
      if(measure === letters[i].measure)
        return letters[i].value
    }
    return measure
  }
  return beat
}

const calculateButtonColor = () => {
  if (beat === 1) {
    for(let i = 0; i < letters.length; i++) {
      if(measure === letters[i].measure)
        return "gold"
    }
    return "darkBlue"
  }
  return "darkRed"
}

const reset = () => {
  setBeat(1);
  setMeasure(1);
  setRunning(false);
}

const append = () => {
  let newData = {
    id: id,
    measure: tempMeasure,
    type: tempType,
    value: tempValue
  }
  rows.push(newData);
  setRows(rows);
  setId(id => id + 1);
  if(tempType === "Rehearsal") {
    setLetters(letters.concat([newData]))
  }
}

return (
  <ThemeProvider theme={darkTheme}><CssBaseline>
  <div className="App">
  <div className = "leftColumn">
    <MeasureTable data={rows}/>
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
    <TypeChange type={tempType} onChange={(e) => setTempType(e.target.value)}/>
    <ValueBox state={tempType} onChange={(v) => setTempValue(v.target.value)} />
    <br></br>
    <AddButton onClick = {append}/>
    </div>
    <div className="middleColumn"></div>
    <div className="rightColumn">
    <MeasureButtons 
      onChange={(_, newTimeSignature) => setTimeSignature(newTimeSignature)} 
      timeSignature={timeSignature} 
    />
    <br></br>
    <button className = "CenterButton"
    style={{backgroundColor: buttonColor}}>
    { buttonText }
    </button>
    <br></br>
    <StopButton onClick={() => setRunning(!running)} running={running} />
    <VolumeButton onClick={() => setVolume(!volume)} volume={volume} />
    <br></br>
    <ResetButton onClick={reset} />
  </div>
  </div>
  </CssBaseline></ThemeProvider>
);
}