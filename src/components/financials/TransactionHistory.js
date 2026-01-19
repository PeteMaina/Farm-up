import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Typography,
    Box,
    TextField,
    InputAdornment
} from '@mui/material';
import { Search, Receipt } from '@mui/icons-material';

const transactions = [
    { id: 'TRX-9801', date: '2026-10-24', recipient: 'AgriCorp Ltd', description: 'Corn Shipment Q3', amount: 12500.00, type: 'credit', status: 'Completed', category: 'Sales' },
    { id: 'TRX-9802', date: '2026-10-23', recipient: 'Local Utilities', description: 'Water & Electricity', amount: 450.50, type: 'debit', status: 'Pending', category: 'Utilities' },
    { id: 'TRX-9803', date: '2026-10-22', recipient: 'John Deere Dealer', description: 'Tractor Maintenance', amount: 1200.00, type: 'debit', status: 'Completed', category: 'Maintenance' },
    { id: 'TRX-9804', date: '2026-10-21', recipient: 'Daily Labor', description: 'Harvest Workers', amount: 3500.00, type: 'debit', status: 'Completed', category: 'Labor' },
    { id: 'TRX-9805', date: '2026-10-20', recipient: 'Seed Co.', description: 'Spring Wheat Seeds', amount: 2800.75, type: 'debit', status: 'Completed', category: 'Supplies' },
];

import { useLocalization } from '../../context/LocalizationContext';



const TransactionHistory = () => {
    const { formatCurrency } = useLocalization();
    const [search, setSearch] = useState('');

    return (
        <Card>
            <CardHeader
                title="Recent Transactions"
                titleTypographyProps={{ fontWeight: 700 }}
                action={
                    <TextField
                        size="small"
                        placeholder="Search records..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search fontSize="small" />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 2, bgcolor: 'background.default' }
                        }}
                    />
                }
            />
            <CardContent sx={{ p: 0 }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: 'action.hover' }}>
                            <TableRow>
                                <TableCell>Transaction ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight={600} color="primary">
                                            {row.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>
                                        <Box>
                                            <Typography variant="body2" fontWeight={500}>{row.recipient}</Typography>
                                            <Typography variant="caption" color="text.secondary">{row.description}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={row.category} size="small" variant="outlined" />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            size="small"
                                            color={row.status === 'Completed' ? 'success' : 'warning'}
                                            sx={{ borderRadius: 1 }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            variant="body2"
                                            fontWeight={700}
                                            color={row.type === 'credit' ? 'success.main' : 'text.primary'}
                                        >
                                            {row.type === 'credit' ? '+' : '-'}{formatCurrency(row.amount)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default TransactionHistory;
