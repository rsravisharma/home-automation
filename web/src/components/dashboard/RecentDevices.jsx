import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from 'react-router-dom';
// import devices from 'src/__mocks__/devices'
import { useState } from 'react';
import DeviceDialog from '../shared/DeviceDialog';
import PropTypes from 'prop-types';

RecentDevices.propTypes = {
  devices: {
    length: PropTypes.number,
    slice: PropTypes.func,
  }
};

export default function RecentDevices(props){
  const MAX = 5;
  var devices = props.devices;
  const [viewingDevice, setViewingDevice] = useState([false, false, false, false, false]);
  
  return (
  <>
    <Card {...props}>
      <CardHeader
        subtitle={`${devices.length} in total`}
        title="Recent Devices"
      />
      <Divider />
      <List>
        {(devices.slice(0, MAX)).map((device, i) => (
          <ListItem
            divider={i < devices.length - 1}
            key={i}
          >
            <ListItemText
              primary={device.device_name}
              secondary={<Typography type="body2" style={device.offline_at?{color: '#69778b', fontSize: 14}:{color: 'teal', fontSize: 14}}>
                {device.offline_at?`Offlined at ${device.offline_at}`:`Online`}</Typography>}
              //teal = #14a37f
              // secondary={device.offline_at?`Offlined at ${device.offline_at}`:`Online`}
            />
            <IconButton
              edge="end"
              size="small"
              onClick={() => {
                var tmp = [false, false, false, false, false];
                for(var j = 0; j < MAX; j++)
                  tmp[j] = viewingDevice[j];
                tmp[i] = true;
                setViewingDevice(tmp);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Link to="/app/devices">
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </Box>
    </Card>
    {(devices.slice(0, MAX)).map((device, i) => (
      <DeviceDialog
        device={device}
        viewingDevice={viewingDevice[i]}
        setViewingDevice={(val)=>{
          var tmp = [false, false, false, false, false];
          for(var j = 0; j < MAX; j++)
            tmp[j] = viewingDevice[j];
          tmp[i] = val;
          setViewingDevice(tmp);
        }}
        key={i}
      />
    ))}
  </>
)}

