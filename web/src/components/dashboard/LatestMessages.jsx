import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
// import messages from './__mocks__/messages';
import { useState } from 'react';
import DeviceChip from '../shared/DeviceChip';
import MsgidChip from '../shared/MsgidChip';
import PropTypes from 'prop-types';

LatestMessages.propTypes = {
  messages: {
    reverse: PropTypes.func,
    slice: PropTypes.func,
  }
};

export default function LatestMessages(props){
  const MAX = 6;
  const [latestOrder, setLatestOrder] = useState(true);  
  var messages = props.messages;
  
  return (
  <Card {...props}>
    <CardHeader title="Latest Messages" />
    <Divider />
      <Box sx={{ minWidth: 700 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Message ID
              </TableCell>
              <TableCell>
                Deivce Name
              </TableCell>
              <TableCell>
                Device ID
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction={latestOrder?"desc":"asc"}
                    onClick={()=>{
                      setLatestOrder(!latestOrder);
                      messages.reverse();
                    }}
                  >
                    Time
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              {/* <TableCell>
                Info
              </TableCell> */}
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(messages.slice(0, MAX)).map((message) => (
              <TableRow
                hover
                key={message.msgid}
              >
                <TableCell>
                  <MsgidChip msgid={message.msgid}/ >
                </TableCell>
                <TableCell>
                  {message.device_name}
                </TableCell>
                <TableCell>
                  <DeviceChip clientid={message.clientid} />
                </TableCell>
                <TableCell>
                  {message.timestamp}
                </TableCell>
                {/* <TableCell>
                  {message.info}
                </TableCell> */}
                <TableCell>
                  <Chip
                    label={message.alert?'alert':'normal'}
                    size="small"
                    style={message.alert?{
                      backgroundColor: '#ffc400',
                      color: 'white'
                    }:{
                      color: 'black'
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Link to="/app/messages">
        <Button
          color="primary"
          endIcon={<ArrowForwardIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Link>
      
    </Box>
  </Card>
)}
