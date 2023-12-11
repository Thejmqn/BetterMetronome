import axios from "axios";
import React, { Fragment, useState } from "react";
import { Button, TextField } from '@mui/material'
import Upload from '@mui/icons-material/Upload';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

const sendTableData = async (tableData) => {
    const tableHost = "http://localhost:8080/uploadsong";
    try {
        await axios.post(tableHost, tableData);
    } catch (err) {
        console.log(err);
    }
}

export function UploadButton(props) {
    const [boxOpen, setBoxOpen] = useState(false);
    const [title, setTitle] = useState("Untitled");
    const [description, setDescription] = useState("No Description");

    const changeDialogState = () => {
        setBoxOpen(boxOpen => !boxOpen);
    }

    return (
    <Fragment>
        <Button 
            onClick={changeDialogState} 
            color={'secondary'}
            size={'small'}
            startIcon={<Upload />}>
            Upload Table
        </Button>
        <Dialog open={boxOpen} onClose={changeDialogState}>
            <DialogTitle>Upload Table</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please choose a song title and description for the song you
                    are choosing to upload. Also put in a username to make it easily
                    searchable in the future for yourself. You may not choose a 
                    song title that has already been chosen.  
                </DialogContentText>
                <TextField 
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    label="Song Title"
                    variant="standard"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField 
                    autoFocus
                    required
                    multiline
                    margin="dense"
                    id="description"
                    label="Song Description"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={changeDialogState}>Cancel</Button>
                <Button onClick={() => sendTableData({
                    title: title,
                    description: description,
                    data: props.tableData,
                    tempo: props.tempo,
                    timeSignature: props.timeSignature,
                })}>Submit</Button>
            </DialogActions>
        </Dialog>
    </Fragment>
    );
}