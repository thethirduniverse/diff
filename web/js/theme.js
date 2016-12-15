import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {teal500, teal700} from 'material-ui/styles/colors'

const theme = getMuiTheme({
  fontFamily: 'Raleway, sans-serif',
  palette: {
    primary1Color: teal500,
    primary2Color: teal700
  }
})
export default theme
