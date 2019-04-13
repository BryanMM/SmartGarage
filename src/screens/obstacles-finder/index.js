import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Obstruction extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          TO-DO
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 24,
    textAlign: 'center',
  },
});