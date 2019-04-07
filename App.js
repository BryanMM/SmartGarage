import { createStackNavigator } from 'react-navigation';

import Login from './screens/login';
import Home from './screens/home';
import checkObstruction from './screens/obstacles-finder';
import parkingAssistance from './screens/parking-assistance';
import parkingSchedule from './screens/parking-scheduling';
import Settings from './screens/settings';
import SelectionMenu from './screens/selection-menu'

const App = createStackNavigator ({
  Login: { screen: Login },
  Home: { screen: Home },
  SelectionMenu: {screen: SelectionMenu },
  parkingAssistance: { screen: parkingAssistance },
  parkingSchedule: { screen: parkingSchedule },
  checkObstructions: { screen: checkObstruction },
  Settings: { screen: Settings },
})

export default App

