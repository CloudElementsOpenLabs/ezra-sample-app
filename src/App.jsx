// External dependencies
import React, {Component} from 'react';
import BaseTemplate from './components/General/BaseTemplate';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4d82bf'
      }
    },
    typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '"Lato"',
        'sans-serif'
      ].join(',')
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        // Cloud Elements tokens to be used. This should be your admin account where you want to monitor all users' instances
        this.state = {
            ceKeys: {
                orgToken: process.env.REACT_APP_CE_ORG,
                userToken: process.env.REACT_APP_CE_USER,
                ceEnv: process.env.REACT_APP_CE_ENV,
            },
        }
    }

    render() {
        const {ceKeys} = this.state;
        return (
            <ThemeProvider theme={theme}>
                <BaseTemplate
                    ceKeys={ceKeys}
                />
            </ThemeProvider>
        );
    }
}

export default App;