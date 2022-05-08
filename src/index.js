import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Material UI
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./utils/Theme";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/index";

import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={Theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
