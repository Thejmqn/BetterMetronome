import axios from "axios";
import { Button } from '@mui/material'
import Upload from '@mui/icons-material/Upload';

const sendTableData = async (tableData) => {
    const tableHost = "http://localhost:8080/uploadsong";
    try {
        await axios.post(tableHost, tableData);
    } catch (err) {
        console.log(err);
    }
}

export function UploadButton(props) {
    return <Button 
        onClick={() => sendTableData(props.tableData)} 
        color={'secondary'}
        size={'small'}
        startIcon={<Upload />}>
        Upload Table
    </Button>
}