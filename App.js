import { createStackNavigator } from 'react-navigation';

import UserLogin from './screens/login';
import Home from './screens/home';
import Obstruction from './screens/obstacles-finder';
import Assistance from './screens/parking-assistance';
import Schedule from './screens/parking-scheduling';
import Settings from './screens/settings';

const App = createStackNavigator ({
  Login: { screen: UserLogin },
  Home: { screen: Home },
  Assistance: { screen: Assistance },
  Schedule: { screen: Schedule },
  Obstruction: { screen: Obstruction },
  Settings: { screen: Settings },
})

export default App

