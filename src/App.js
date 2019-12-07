import React from 'react';
import Navigator from './app/navigator'
import { createStore, applyMiddleware } from 'redux'
import  thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import appReducer from './app/store/app.reducer';
const store = createStore(appReducer, applyMiddleware(thunk))
function App() {
  return (    
    <Provider store ={store}>
      <Navigator />    
    </Provider>
  );
}

export default App;
