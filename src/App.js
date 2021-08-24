
import './App.css';
import { ThemeProvider, createTheme } from '@material-ui/core';

import { orange } from '@material-ui/core/colors';

import Home from './Home';


function App() {
  const theme = createTheme({
    status : {
      danger: orange[500]
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
