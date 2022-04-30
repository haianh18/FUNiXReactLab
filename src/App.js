import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();
class App extends Component {

  render() {
    return (
      <div className='App'>
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Main />
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;