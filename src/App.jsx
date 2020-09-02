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
        const ce_keys = {
            orgToken: process.env.REACT_APP_CE_ORG,
            userToken: process.env.REACT_APP_CE_USER,
            ceEnv: process.env.REACT_APP_CE_ENV,
        };
        this.state = {
            ceKeys: ce_keys,
            appUrl: process.env.REACT_APP_URL
        }
    }

    render() {
        const {ceKeys, appUrl} = this.state;
        return (
            <ThemeProvider theme={theme}>
                <BaseTemplate
                    ceKeys={ceKeys}
                    appUrl={appUrl}
                />
            </ThemeProvider>
        );
    }
}

export default App;