import React, { useState, useContext } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ExpenseTrackerContext } from '../../../context/context'
import { v4 as uuidv4 } from 'uuid';


interface Transaction {
    amount: number;
    category: string;
    type: string;
    date: Date;
    id: string;
}

const initialState: Transaction = {
    amount: 0,
    category: '',
    type: 'Income',
    date: new Date(),
    id: ''
}

const Form = () => {

    const [formData, setFormData] = useState(initialState)
    const { addTransaction } = useContext(ExpenseTrackerContext) as unknown as { addTransaction: (transaction: Transaction) => void };

    const createTransaction = () => {
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }
    
        addTransaction(transaction);
        setFormData(initialState);
    }

  return (
    <Grid 
        container 
        spacing={5}
        style={{backgroundColor: 'rgba(205, 205, 205, 0.1)'}}
    >
        <Grid item xs={12}>
            <Typography align='center' variant='subtitle2' gutterBottom>
                ...
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth style={{backgroundColor: 'rgba(205, 205, 205, 0.1)'}}>
                <InputLabel>Type</InputLabel>
                <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={{color: 'rgba(205, 205, 205, 1)'}}>
                    <MenuItem value='Income'>Income</MenuItem>
                    <MenuItem value='Expense'>Expense</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth style={{backgroundColor: 'rgba(205, 205, 205, 0.1)'}}>
                <TextField value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} type='string' label='Category' fullWidth sx={{ input: { color: 'rgba(205, 205, 205, 1)' } }} style={{backgroundColor: 'rgba(205, 205, 205, 0.1)'}} />
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <TextField value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} type='number' label='Amount' fullWidth sx={{ input: { color: 'rgba(205, 205, 205, 1)' } }} style={{backgroundColor: 'rgba(205, 205, 205, 0.1)'}} />
        </Grid>
        <Grid item xs={6}>
            <TextField value={formData.date} onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })} type='date' fullWidth sx={{ input: { color: 'rgba(205, 205, 205, 1)' } }} style={{backgroundColor: 'rgba(205, 205, 205, 0.1)'}} />
        </Grid>
        <Grid item xs={12}>
            <Button variant='outlined' color='inherit' fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    </Grid>
  )
}

export default Form