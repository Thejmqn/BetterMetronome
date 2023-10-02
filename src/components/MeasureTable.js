import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export default function MeasureTable(props) {
    return <TableContainer sx={{height:"50vh"}}>
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
            {props.data.map((row) => (
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
}