import { createStackNavigator } from 'react-navigation';

import UserLogin from './screens/user-login';
import Home from './screens/user-home';

const App = createStackNavigator ({
  Login: { screen: UserLogin },
  Home: { screen: Home }
})

export default App

