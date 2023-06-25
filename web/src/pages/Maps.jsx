import AllMessagesMap from "../components/shared/AllMessagesMap";
import PropTypes from 'prop-types';

Maps.propTypes = {
  height: PropTypes.number,
};

export default function Maps({height}){
    return <AllMessagesMap height={height}/>
}
