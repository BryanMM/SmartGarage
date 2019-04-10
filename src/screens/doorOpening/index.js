import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class App extends React.Component {
  _onPress() {

  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.container}
          onPress={this._onPress}>
          <View style={styles.gridItem} backgroundColor='#7dceff'>
            <View>
              <Text style={styles.title}> {item.title} coso</Text>
            </View>

            <View />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridItem: {
    alignItems: 'center',
    borderRadius: 300,
    borderWidth: 2,
    height: 170,
    justifyContent: 'center',
    margin: 15,
    width: 170,
  },
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  title: {
    color: '#161D25',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 15,
    textAlign: 'center',
  },
  thumbnail: {
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 1.5,
    height: 100,
    width: 130
  },
});
