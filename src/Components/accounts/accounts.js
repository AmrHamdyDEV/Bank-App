import React, {useState, useEffect} from 'react'
import styles from './assets/accounts.module.sass'
import {Container, Grid} from '@material-ui/core'
const Accounts = (props) =>{
    const[account, setAccount] = useState({})
    useEffect(()=>{
        console.log(props.bankslists)
        let bankslists = props.bankslists
        let index = props.index
        let selectedAccount = bankslists[index]
        setAccount(selectedAccount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.bankslists])
    return(
        <Container maxWidth='md' className={styles.accountWrapper}>
            <Grid className={styles.head} container justify='center' alignItems='center'>
                <Grid className={styles.info} item xs={4}>
                    ACCOUNT NUMBER
                </Grid>
                <Grid className={styles.info} item xs={4}>
                    ACCOUNT CODE
                </Grid>
                <Grid className={styles.info} item xs={4}>
                    ACCOUNT STATUS
                </Grid>
            </Grid>
            <Grid className={styles.head} container justify='center' alignItems='center'>
                <Grid className={styles.accountData} item xs={4}>
                    <div>
                        {account.accountNo}
                    </div>
                </Grid>
                <Grid className={styles.accountData} item xs={4}>
                    <div>
                        {account.accountCode}
                    </div>
                </Grid>
                <Grid className={styles.accountData} item xs={4}>
                    <div>
                        {account.accountStatus ? 'Active' : 'Not Active'}
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}
export default Accounts