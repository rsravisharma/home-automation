import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Typography
  } from '@mui/material';
  import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
  import PropTypes from 'prop-types';

  TotalDevices.propTypes = {
    devicesNum: PropTypes.number,
    onlineNum: PropTypes.number,
  };
  
  export default function TotalDevices ({devicesNum, onlineNum}) {
    <Card
      sx={{ height: '100%' }}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL DEVICES
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              Online {onlineNum}/{devicesNum}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "red",
                height: 56,
                width: 56
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={devicesNum?onlineNum/devicesNum * 100 : 0}
            variant="determinate"
          />
        </Box>
        {/* <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowDownwardIcon sx={{ color: red[900] }} />
          <Typography
            sx={{
              color: red[900],
              mr: 1
            }}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  }
  
  