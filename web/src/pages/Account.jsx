import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import fetchAccount from '../utils/fetchAccount';
import AccountPassword from '../components/account/AccountPassword'
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Account = () => {
  const [account, setAccount] = useState({});
  
  useEffect(() => {
    if(sessionStorage.getItem('user_name'))
    {
      fetchAccount().then((obj) => {
        setAccount(obj);
      });
    }
  }, []);
    return (
    <>
        <Helmet>
          <title>Account | IoTwebsite</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3,
            mt: '4%',
            // display: 'flex',
            // height: '100%',
            // justifyContent: 'center',
            // flexDirection: 'column',
          }}
        >
          <Container maxWidth="sm">
            <Box>
                <AccountProfile account={account} />
                <AccountProfileDetails account={account} />
                <AccountPassword />
            </Box>
          </Container>
        </Box>
    </>
  )
};

export default Account;
