import React, {useState, useEffect, Fragment} from 'react'
import styles from './assets/bank.module.sass'
import axios from '../../axios'
import {Container, Grid, Dialog, DialogActions, DialogContent, Select ,MenuItem} from '@material-ui/core'
import {withSnackbar} from 'notistack'
const Bank = (props) =>{
    const[bankslists, setBankslists] = useState([])
    const [selectedBank, setSelectedBank] = useState({})
    const[loading, setLoading] = useState(true)
    const [isOpen, setOpen] = useState(false)
    const[select, setSelect] = useState([])
    const[accounts, setAccounts] = useState(false)
    function fetchData(){
        axios.get("/banks.json").then(response => {
            let banksArr = []
            for(let key in response.data){
                banksArr.push(
                    {...response.data[key] , id: key}
                )
            }
            console.log(banksArr)
            setBankslists(banksArr)
            let newSelect = []
            for(let i = 0; i < banksArr.length; i++){
                newSelect.push("default")
            }
            console.log(newSelect)
            setSelect(newSelect)
          })
    }
    useEffect(()=>{
        fetchData()
    },[])
    useEffect(()=>{
        setLoading(false)
    },[bankslists])
    let handleSubmit = e =>{
        e.preventDefault()
        let data = new FormData(e.target)
        data.delete("index")
        let object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        let json = JSON.stringify(object)
        let check = data.get('active')
        console.log(check)
        check === null ? data.set('active' , false) : data.set('active' , true)
        for(let fields of data.entries()){
            console.log(fields)
        }

        if(Object.keys(selectedBank) < 1){
            axios.post(`/banks.json` , json , {headers : {data: JSON.stringify(data)}}).then(response => {
                setOpen(false)
                fetchData()
                props.enqueueSnackbar("Bank Added Successfully", {
                    variant: "success",
                }); 
              })
        }else if(selectedBank.selection === 'edit'){
            let bankId = bankslists.find(bank => bank.name === selectedBank.name).id
            console.log(bankId)
            axios.put(`/banks/${bankId}.json` , json , {headers : {data: JSON.stringify(data)}}).then(response => {
                setOpen(false)
                fetchData()
                props.enqueueSnackbar("Bank Edited Successfully", {
                    variant: "success",
                }); 
            })
        }else if(selectedBank.selection === 'delete'){
            let bankId = bankslists.find(bank => bank.name === selectedBank.name).id
            console.log(bankId)
            axios.delete(`/banks/${bankId}.json` , json , {headers : {data: JSON.stringify(data)}}).then(response => {
                setOpen(false)
                fetchData()
                props.enqueueSnackbar("Bank Deleted Successfully", {
                    variant: "info",
                }); 
            })
        }
        setSelectedBank({})
    }
    function addBank(e){
        setOpen(true)
        setSelect([...select ,'add'])
    }
    function handleClose(e, index){
        setOpen(false)
        let newSelect = [...select]
        newSelect[index] = "default"
        setSelect(newSelect)
        setSelectedBank({})
    }
    function handleChange(e , bank, index){
        let selection = e.target.value
        let newSelect = [...select]
        newSelect[index] = selection
        setSelect(newSelect)
        setOpen(true)
        setSelectedBank({...bank, index, selection})
    }
    function handleDelete(){
        let bankId = bankslists.find(bank => bank.name === selectedBank.name).id
            console.log(bankId)
            axios.delete(`/banks/${bankId}.json`).then(response => {
                setOpen(false)
                fetchData()
                props.enqueueSnackbar("Bank Deleted Successfully", {
                    variant: "info",
                }); 
            })
            setSelectedBank({})
    }
    if(!loading){
        return(
            <div className={styles.banksWrapper}>
                <Container maxWidth='lg'>
                    <h2 onClick={addBank} className={styles.add}>Add Bank</h2>
                    <Grid className={styles.head} container justify='center' alignItems='center'>
                        <Grid className={styles.info} item xs={3}>
                            NAME
                        </Grid>
                        <Grid className={styles.info} item xs={3}>
                            CODE
                        </Grid>
                        <Grid className={styles.info} item xs={3}>
                            STATUS
                        </Grid>
                        <Grid className={styles.info} item xs={3}>
                            ACTIONS
                        </Grid>
                    </Grid>
                        {!bankslists.length  ? null: bankslists.map((bank, index) =>{
                            return(
                                <Grid className={styles.head} container justify='center' alignItems='center' key={bank.id}>
                                    <Grid className={styles.bankData} item xs={3}>
                                        <div>
                                            {bank.name}
                                        </div>
                                    </Grid>
                                    <Grid className={styles.bankData} item xs={3}>
                                        <div>
                                            {bank.code}
                                        </div>
                                    </Grid>
                                    <Grid className={styles.bankData} item xs={3}>
                                        <div>
                                            {bank.active ? 'Active' : 'Not Active'}
                                        </div>
                                    </Grid>
                                    <Grid className={styles.bankData} item xs={3}>
                                        <div>
                                        <Select
                                            value={select[index] || "default"}
                                            onChange={e =>handleChange(e , bank, index)}
                                        >
                                            <MenuItem value="default" disabled>
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value='edit'>Edit</MenuItem>
                                            <MenuItem value='delete'>Delete</MenuItem>
                                            </Select>
                                        </div>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                        {
                            selectedBank.selection === 'delete' ?
                                <Fragment>
                                    <DialogContent>
                                        <h2 className={styles.confirm}>Confirm Delete of Bank</h2>
                                    </DialogContent>
                                    <DialogActions>
                                        <button onClick={handleDelete} type="submit" color="primary" className={styles.save}>
                                            SAVE
                                        </button>
                                        <button type="button" className={styles.cancel} onClick={(e) => handleClose(e, selectedBank.index)} color="primary">
                                            Cancel
                                        </button>
                                    </DialogActions>
                                </Fragment>
                                :
                                <Fragment>
                                <DialogContent>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container>
                                            <Grid item xs={2}>
                                                <label className='formDialog'>Name</label>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <input className='formDialog' name='name' type='text' defaultValue={selectedBank ? selectedBank.name : null}/>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <label className='formDialog'>Code</label>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <input className='formDialog' name='code' type='text' defaultValue={selectedBank ? selectedBank.code : null}/>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <label className='formDialog'>Status</label>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <input className='formDialog' name='active' type='checkbox' defaultChecked={selectedBank ? selectedBank.active : null}/>
                                            </Grid>
                                            <input type="hidden" name="index" value={selectedBank.index || ''} />
                                        </Grid> 
                                        <button type="submit" color="primary" className={styles.save}>
                                            SAVE
                                        </button>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <button type="button" className={styles.cancel} onClick={(e) => handleClose(e, selectedBank.index)} color="primary">
                                        Cancel
                                    </button>
                                </DialogActions>
                            </Fragment>
                        }
                        </Dialog>
                </Container>
            </div>
        )
    }else{
        return null
    }
}
export default withSnackbar(Bank)