import React from 'react';
import './App.css';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>        
          <AppRouter />        
      </Provider>
    </div>
  );
}

export default App;
