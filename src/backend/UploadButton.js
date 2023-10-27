import axios from "axios";

const sendTableData = async (tableData) => {
    const tableHost = "http://localhost:8080/songs";
    try {
        await axios.post(tableHost, tableData);
    } catch (err) {
        console.log(err);
    }
}

export default function UploadButton(props) {
    return (
        <button onClick={() => sendTableData(props.tableData)}></button>
    );
}