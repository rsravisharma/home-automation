import { useState } from 'react';
import {
    Chip} from '@mui/material';
import fetchSingleMessage from '../../utils/fetchSingleMessage';
import MessageDialog from './MessageDialog'; 
import PropTypes from 'prop-types';

MsgidChip.propTypes = {
  msgid: PropTypes.string
};


export default function MsgidChip({ msgid }){
    const [messageLoaded, setMessageLoaded] = useState(false);
    const [message, setMessage] = useState({});
    const [viewingMessage, setViewingMessage] = useState(false);

    return (
        <>
            <Chip
                color='primary'
                label={msgid}
                size="small"
                onClick={()=>{
                    if(!messageLoaded)
                    {
                        fetchSingleMessage(msgid).then((obj)=>{
                            setMessage(obj);
                            setMessageLoaded(true);
                            setViewingMessage(true);
                        })
                    }
                    setViewingMessage(true);
                }}
            />
            
            <MessageDialog
                message={message}
                viewingMessage={viewingMessage}
                setViewingMessage={setViewingMessage}
            />
        </>
    )
}