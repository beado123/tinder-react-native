import React from 'react';
import styles from '../styles.js'
import { Text, View, Alert } from 'react-native';
import  {connect} from 'react-redux';

class Home extends React.Component {
    state = {}

    componentDidMount(){

    }



    render() {
        return (
            <View>
                <Text>Home</Text>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    };
}

export default connect(mapStateToProps)(Home);
