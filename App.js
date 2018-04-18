import React from 'react';
import Login from './screens/Login.js';
import reducers from './redux/reducers.js';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { YellowBox } from 'react-native';
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducers, middleware);

export default class App extends React.Component {
    constructor(props){
        super(props);
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: Encountered two children with the same key, `[object Object]`'
        ]);
    }
  render() {
    return (
        <Provider store={store}>
            <Login/>
        </Provider>
    );
  }
}
