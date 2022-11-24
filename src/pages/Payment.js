import React from 'react';
import Navbar from './Navbar';
import { Box, Paper, Table, Button, 
    TableContainer, TableHead, TableBody, TableRow, TableCell, TextField } from '@mui/material';

export default function Payment() {

    return (
        <Box>
            <Navbar />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h1>Health 수강료</h1></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableCell><h2>총 결제 금액 : 100,000원</h2></TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell>
                            <h2>카드 결제</h2>
                            <TextField id="standard-basic" label="카드 번호" variant="standard" inputProps={{ maxLength: 4}} />
                            <TextField id="standard-basic" label="****" variant="standard" inputProps={{ maxLength: 4 }} />
                            <TextField id="standard-basic" label="****" variant="standard" inputProps={{ maxLength: 4 }} />
                            <TextField id="standard-basic" label="****" variant="standard" inputProps={{ maxLength: 4 }} />
                            <br />
                            <TextField id="standard-basic" label="유효기간 MM" variant="standard" inputProps={{ maxLength: 2 }} />
                            <TextField id="standard-basic" label="YY" variant="standard" inputProps={{ maxLength: 2 }} />
                        </TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell>
                            <Button onClick={() => alert("결제가 완료되었습니다.")} href="/matchingcomplete">
                                <h2>결제하기</h2>
                            </Button>
                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
}