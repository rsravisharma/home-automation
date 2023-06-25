import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText,
    Typography} from '@mui/material';
import SingleMessageMap from './SingleMessageMap';
import PropTypes from 'prop-types';

MessageDialog.propTypes = {
  message: {
    msgid: PropTypes.any,
    info: PropTypes.string,
    clientId: PropTypes.string,
    timestamp: PropTypes.number,
    value: PropTypes.number
  },
  setViewingMessage: PropTypes.func,
  viewingMessage: PropTypes.func
};

export default function MessageDialog({message, viewingMessage, setViewingMessage}){
    return (
        <Dialog
            onClose={()=>{setViewingMessage(false)}}
            aria-labelledby="simple-dialog-title"
            open={viewingMessage}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle id="simple-dialog-title">Message Detail</DialogTitle>
            {
                Object.keys(message).length?
                <DialogContent>
                    <DialogContentText>
                        <Typography variant='h3'>Message #{message.msgid}</Typography>
                        <Box sx={{ m: 2, p: 2, border: '1px dashed grey' }}>
                            <Typography>{message.info}</Typography>
                        </Box>
                        <Typography>Sent by <b>{message.clientId}</b> at <b>{message.timestamp}</b> with value <b>{message.value}</b></Typography>
                    </DialogContentText>
                    <SingleMessageMap height='50vh' message={message} />
                </DialogContent>
                :
                <DialogContent>
                    <DialogContentText>
                        Loading...
                    </DialogContentText>
                </DialogContent>
            }
            <DialogActions>
            <Button onClick={()=>{setViewingMessage(false)}}>Close</Button>
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