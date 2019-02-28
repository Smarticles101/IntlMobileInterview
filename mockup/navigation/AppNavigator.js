
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import ListScreen from '../screens/ListScreen';

const nav = createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: { screen: LoginScreen },
  List: { screen: ListScreen }
}, {
  initialRouteName: 'Login',
});

nav.navigationOptions = {
  gesturesEnabled: false
}

export default nav