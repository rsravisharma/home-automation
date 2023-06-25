import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography
  } from '@mui/material';
import PropTypes from 'prop-types';

AccountProfile.propTypes = {
  account: {
    userName: PropTypes.string,
  }
};

export default function  AccountProfile ({account}){
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src='/static/images/avatars/cat_avatar.png'
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
            sx={{mt: 0}}
          >
            {account.userName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
 }
  