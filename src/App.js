import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {StylesProvider} from '@material-ui/styles'
import './App.css';
import Layout from './components/Layout'

// https://demos.creative-tim.com/material-kit-react/?_ga=2.253944523.2129423794.1588781877-444948057.1588781877#/documentation/tutorial
// http://reactcommunity.org/react-transition-group/transition

function App() {
  return (
    <div className="App">
      {/* <StylesProvider injectFirst ></StylesProvider> */}
      <Layout></Layout>
    
    </div>
  );
}

export default App;
