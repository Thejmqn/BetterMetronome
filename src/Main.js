import { useState, useEffect } from 'react';
import { createTheme, CssBaseline, TextField, ThemeProvider, Checkbox } from '@mui/material';
import MeasureTable from './components/MeasureTable';
import { TypeChange, ValueBox } from './components/TableMenu';
import { AddButton, MeasureButtons, ResetButton, StopButton, VolumeButton } from './components/Buttons';
import './Main.css';
import {Howl} from 'howler';

export default function Main() {
  const [timeSignature, setTimeSignature] = useState(4)
  const [bpm, setBpm] = useState(112);
  const [beat, setBeat] = useState(1);
  const [measure, setMeasure] = useState(1);
  const [running, setRunning] = useState(false);
  const [volume, setVolume] = useState(true);
  const [tempData, setTempData] = useState({id: 1, measure: 1, type: "Tempo", value: 0})
  const [tableData, setTableData] = useState([]);
  const [letters, setLetters] = useState([]);
  const [buttonData, setButtonData] = useState({text: "1", color: "darkBlue"});

  const introbeat = new Howl({ src: ["/audio/intro.mp3"]});
  const downbeat = new Howl({ src: ["/audio/downbeat.mp3"]});
  const offbeat = new Howl({ src: ["/audio/offbeat.mp3"]});

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if(running) {
        if(beat < timeSignature) {
          setBeat(beat => beat + 1);
          if(volume)
            offbeat.play();
        } 
        else {
          setBeat(1);
          setMeasure(measure => measure + 1);
          if(volume)
            downbeat.play();
        }
      }
    }, (60/bpm)*1000);

    for(let i = 0; i < tableData.length; i++) {
      if(tableData[i].measure === measure) {
        switch(tableData[i].type) {
        case("Tempo"):
          setBpm(Number(tableData[i].value));
          break;
        case("Time"):
          setTimeSignature(Number(tableData[i].value));
          break;
        default:
          break;
        }
      } 
    }
    setButtonData({text: calculateButtonText(), color: calculateButtonColor()});

    return () => clearInterval(interval);
  }, [beat, measure, running, tableData]);

const calculateButtonText = () => {
  if (beat === 1) {
    for(let i = 0; i < letters.length; i++) {
      if(measure === letters[i].measure)
        return letters[i].value;
    }
    return measure;
  }
  return beat;
}

const calculateButtonColor = () => {
  if (beat === 1) {
    for(let i = 0; i < letters.length; i++) {
      if(measure === letters[i].measure)
        return "gold";
    }
    return "darkBlue";
  }
  return "darkRed";
}

const reset = () => {
  setBeat(1);
  setMeasure(1);
  setRunning(false);
}

const newTableData = () => {
  let newData = {
    id: tempData.id,
    measure: Number(tempData.measure),
    type: tempData.type,
    value: tempData.value
  };
  tableData.push(newData);
  setTableData(tableData);
  setTempData({...tempData, id: tempData.id + 1});
  if(tempData.type === "Rehearsal") {
    setLetters(letters.concat([newData]));
  }
}

function play(sound) {
  new Audio(sound).play();
}

return (
  <ThemeProvider theme={darkTheme}><CssBaseline>
  <div className="App">
  <div className = "leftColumn">
    <MeasureTable data={tableData}/>
    <TextField
      id="outlined-uncontrolled"
      label="Measure"
      value={tempData.measure}
      onChange={(v) => {
        let change = v.target.value;
        if(!isNaN(change) && change >= 0)
          setTempData({...tempData, measure: change});
      } }
    />
    <TypeChange type={tempData.type} 
      onChange={(v) => setTempData({...tempData, type: v.target.value})}
    />
    <ValueBox state={tempData.type}
      onChange={(v) => setTempData({...tempData, value: v.target.value})}
    />
    <br></br>
    <AddButton onClick = {newTableData}/>
  </div>
  <div className="middleColumn">
  </div>
  <div className="rightColumn">
    <MeasureButtons 
      onChange={(_, newTimeSignature) => setTimeSignature(newTimeSignature)} 
      timeSignature={timeSignature} 
    />
    <br></br>
    <button className = "centerButton"
    style={{backgroundColor: buttonData.color}}>
      { buttonData.text }
    </button>
    <br></br>
    <button className = "keySignature">
      
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
