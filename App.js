import { createStackNavigator } from 'react-navigation';
import Login from './src/screens/login';
import Home from './src/screens/home';
import checkObstruction from './src/screens/obstacles-finder';
import parkingAssistance from './src/screens/parking-assistance';
import parkingSchedule from './src/screens/parking-scheduling';
import Register from './src/screens/registration';
import Settings from './src/screens/settings';
import SelectionMenu from './src/screens/selection-menu'

const App = createStackNavigator({
  Register: { screen:Register },
  Login: { screen: Login },
  Home: { screen: Home },
  SelectionMenu: { screen: SelectionMenu },
  parkingAssistance: { screen: parkingAssistance },
  checkObstructions: { screen: checkObstruction },
  parkingSchedule: { screen: parkingSchedule },
  Settings: { screen: Settings },
})

export default App

