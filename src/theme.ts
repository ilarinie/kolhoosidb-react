import { withStyles } from 'material-ui/styles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import withTheme from 'material-ui/styles/withTheme';

// export const kolhoosiTheme = getMuiTheme({
//     palette: {
//         primary1Color: '#FF0025',
//         primary2Color: '#EF5350',
//         primary3Color: '#BDBDBD',
//         accent1Color: '#FFBF00',
//         accent2Color: '#FFFF8D',
//         accent3Color: '#9E9E9E',
//         textColor: '#000000',
//         alternateTextColor: '#fff',
//     },
//     fontFamily: 'Roboto, sans-serif'
// });

// export const darkTheme = getMuiTheme({

// });

export const decorate = withTheme();
export const style = withStyles(({ palette, spacing }) => ({
    root: {
        drawerPaper: {
            width: '250px'
        }
    },
}));