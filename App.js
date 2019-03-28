import { createStackNavigator } from 'react-navigation';

import UserLogin from './screens/user-login';
import Home from './screens/user-home';
import Obstruction from './screens/check-obstacles';
import Assistance from './screens/parking-assistance';
import Schedule from './screens/parking-schedule';
import Settings from './screens/user-settings';

const App = createStackNavigator ({
  Login: { screen: UserLogin },
  Home: { screen: Home },
  Assistance: { screen: Assistance },
  Schedule: { screen: Schedule },
  Obstruction: { screen: Obstruction },
  Settings: { screen: Settings },
})

export default App

