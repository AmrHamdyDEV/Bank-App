import React, {useState, useEffect, Fragment} from 'react'
import styles from './assets/bank.module.sass'
import axios from '../../axios'
import {Container, Grid, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import {withSnackbar} from 'notistack'
const Bank = (props) =>{
    const[bankslists,setBankslists] = useState({})
    const [selectedBank, setSelectedBank] = useState({})
    const[loading,setLoading] = useState(true)
    const [isOpen, setOpen] = useState(false)
    useEffect(()=>{
        axios.get("/banks.json").then(response => {
            let data = response.data
            console.log("data", data)
            setBankslists(data)
          })
    },[])
    useEffect(()=>{
        setLoading(false)
    },[bankslists])
    let handleSubmit = e =>{
        e.preventDefault()
        let data = new FormData(e.target)
        for(let fields of data.entries()){
            console.log(fields)
        }
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object)
        let bankName = data.get('name')
        axios.patch(`/banks/${bankName}.json` , json , {headers : {data: JSON.stringify(data)}}).then(response => {
            let data = response.data
            console.log("data", data)
            setOpen(false)
            axios.get("/banks.json").then(response => {
                let data = response.data
                console.log("data", data)
                setBankslists(data)
                props.enqueueSnackbar("Bank Information updated successfully", {
                    variant: "success",
                  }); 
              })
          })
    }
    function openDialog(e, bank){
        setOpen(true)
        setSelectedBank(bank)
    }
    function handleClose(){
        setOpen(false)
    }
    if(!loading){
        return(
            <div className={styles.banksWrapper}>
                <Container maxWidth='lg'>
                    <Grid className={styles.head} container justify='center' alignItems='center'>
                        <Grid className={styles.info} item xs={4}>
                            NAME
                        </Grid>
                        <Grid className={styles.info} item xs={4}>
                            CODE
                        </Grid>
                        <Grid className={styles.info} item xs={4}>
                            STATUS
                        </Grid>
                    </Grid>
                            {Object.values(bankslists).map(bank =>{
                                return(
                                    <Grid className={styles.head} container justify='center' alignItems='center' key={bank.id} onClick={e => openDialog(e, bank)}>
                                        <Grid className={styles.bankData} item xs={4}>
                                            <div>
                                                {bank.name}
                                            </div>
                                        </Grid>
                                        <Grid className={styles.bankData} item xs={4}>
                                            <div>
                                                {bank.code}
                                            </div>
                                        </Grid>
                                        <Grid className={styles.bankData} item xs={4}>
                                            <div>
                                                {bank.active ? 'Active' : 'Not Active'}
                                            </div>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit Bank Information</DialogTitle>
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <label className='formDialog'>Name</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <input className='formDialog' name='name' type='text'  defaultValue={selectedBank.name}/>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label className='formDialog'>Code</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <input className='formDialog' name='code' type='text' defaultValue={selectedBank.code}/>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label className='formDialog'>Status</label>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <input className='formDialog' name='active' type='checkbox' defaultValue={selectedBank.active}/>
                                    </Grid>
                                </Grid> 
                                <button type="submit" color="primary">
                                    SAVE
                                </button>
                            </form>
                        </DialogContent>
                        <DialogActions>
                        <button type="button" onClick={handleClose} color="primary">
                            Cancel
                        </button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </div>
        )
    }else{
        return null
    }
}
export default withSnackbar(Bank)