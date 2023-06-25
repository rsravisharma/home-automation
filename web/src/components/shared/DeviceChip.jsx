import { useState } from 'react';
import {
    Chip} from '@mui/material';
import fetchSingleDevice from '../../utils/fetchSingleDevice';
import DeviceDialog from './DeviceDialog';
import PropTypes from 'prop-types';

DeviceChip.propTypes = {
    clientid: PropTypes.string,
};

export default function DeviceChip({ clientid }){
    const [deviceLoaded, setDeviceLoaded] = useState(false);
    const [device, setDevice] = useState({});
    const [viewingDevice, setViewingDevice] = useState(false);
    
    return (
        <>
            <Chip
                color='primary'
                label={clientid}
                onClick={()=>{
                    if(!deviceLoaded)
                    {
                        fetchSingleDevice(clientid).then((obj)=>{
                            setDevice(obj);
                            setViewingDevice(true);
                            setDeviceLoaded(true);
                        })
                    }
                    else setViewingDevice(true);
                }}
                size="small"
            />
            <DeviceDialog
                device={device}
                viewingDevice={viewingDevice}
                setViewingDevice={setViewingDevice}
            />
        </>
    )
}