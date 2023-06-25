import { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText,
    Typography} from '@mui/material';
import SingleDeviceMaps from './SingleDeviceMap';
import fetchMessageOfDevice from '../../utils/fetchMessageOfDevice';
import PropTypes from 'prop-types';

DeviceDialog.propTypes = {
  device: {
    clientId: PropTypes.string,
    deviceName: PropTypes.string,
    offlineAt: PropTypes.number,
    onlineAt: PropTypes.number,
    created: PropTypes.number,
  },
  viewingDevice: PropTypes.object,
  setViewingDevice: PropTypes.func,
  messages: PropTypes.object,
  clientId: PropTypes.func,
  deviceName: PropTypes.func,
  offlineAt: PropTypes.number,
  onlineAt: PropTypes.number,
  created: PropTypes.number,
};

export default function DeviceDialog({device, viewingDevice, setViewingDevice}){
    // const [messages, setMessages] = useState([]);
    const [messagesLoaded, setMessagesLoaded] = useState(false);

    useEffect(()=>{
        if(viewingDevice && !messagesLoaded)
        {
            setMessagesLoaded(true);
            fetchMessageOfDevice(device.clientId).then(() => {
                // setMessages(data);
            });
        }
    });

    return (
        <Dialog
            onClose={() => {
                setViewingDevice(false);
            }}
            aria-labelledby="simple-dialog-title"
            open={viewingDevice}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle id="simple-dialog-title">Device Detail</DialogTitle>
            {
                Object.keys(device).length?
                <DialogContent>
                    <Typography variant='h2'>{device.deviceName}</Typography>
                    <DialogContentText>
                        <Typography>#{device.clientId}</Typography>
                    </DialogContentText>
                        {
                            device.offlineAt?
                            <Typography style={{color: '#69778b'}}><b>Offlined</b> at {device.offlineAt}</Typography>
                            :<Typography style={{color: 'teal'}}><b>Online</b></Typography>
                        }
                    <DialogContentText>
                        <Typography>Latestly onlined at {device.onlineAt}</Typography>
                        <Typography>Created at {device.created}</Typography>
                    </DialogContentText>
                    <SingleDeviceMaps height='50vh' device={device} />
                </DialogContent>
                :
                <DialogContent>
                    <DialogContentText>
                        Loading...
                    </DialogContentText>
                </DialogContent>
            }
            <DialogActions>
            <Button onClick={() => {
                setViewingDevice(false);
            }}>Cancel</Button>
            {/* <Button
                color="primary"
                variant="contained"
                onClick={()=>{
                    console.log('Submitting')
                }}
            >
                Submit
            </Button> */}
            </DialogActions>
        </Dialog>
    );
}