import { useState, useEffect } from "react";
import axios from "axios";

export default function Data() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const host = "http://localhost:8080/data";
                const res = await axios.get(host);
                setData(res.data);
                console.log(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllData();
    }, []);

    return (
        <p>{data.length > 0 && data.map(point=>(point.info))}</p>
    );
}