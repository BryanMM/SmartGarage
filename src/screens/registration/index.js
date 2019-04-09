import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:null
  });
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Pick a date and schedule your parkings</Text>
        </View>
        <TextInput style={styles.textInput}
          placeholder="Type your name here"
          underlineColorAndroid={'transparent'}/>
        <TextInput style={styles.textInput}
          placeholder="Type your email here"
          underlineColorAndroid={'transparent'}/>
        <TextInput style={styles.textInput}
          placeholder="Type your password here"
          underlineColorAndroid={'transparent'}/>
        <TextInput style={styles.textInput}
          placeholder="Re-type your password here"
          underlineColorAndroid={'transparent'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
  },
  banner: {
    width: '100%',
    height: 60,
    backgroundColor: '#161D25'
  },
  bannerText: {
    color: '#cfedfc',
    paddingTop: 15,
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    alignSelf: 'stretch',
    borderBottomColor: '#161D25',
    borderBottomWidth: 1,
    color: '#161D25',
    fontFamily: 'Roboto',
    fontSize: 15,
    height: 40,
    margin: 5,
    marginTop: 5,

  },
});
