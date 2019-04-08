import { createStackNavigator } from 'react-navigation';
import Login from './src/screens/login';
import Home from './src/screens/home';
import checkObstruction from './src/screens/obstacles-finder';
import parkingAssistance from './src/screens/parking-assistance';
import parkingSchedule from './src/screens/parking-scheduling';
import Settings from './src/screens/settings';
import SelectionMenu from './src/screens/selection-menu'

const App = createStackNavigator({
  parkingSchedule: { screen: parkingSchedule },
  Login: { screen: Login },
  Home: { screen: Home },
  SelectionMenu: { screen: SelectionMenu },
  parkingAssistance: { screen: parkingAssistance },
  checkObstructions: { screen: checkObstruction },
  Settings: { screen: Settings },
})

export default App

