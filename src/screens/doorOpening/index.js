import * as React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';

import iconGarageOpen from '../../assets/openGarage.png';
import iconGarageClosed from '../../assets/closedGarage.png';

export default class App extends React.Component {
  static navigationOptions = ({
    header: null
  });

  _onPressClose() {
    init({
      size: 10000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true,
      reconnect: true,
      sync: {}
    });

    function onConnect() {
      console.log("onConnect");

      const topic = "/light/in"
      const topicdos = "/light/out"
      client.subscribe(topicdos);
      message = new Paho.MQTT.Message("2");
      message.destinationName = topic;
      client.send(message);
    }

    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    function onMessageArrived(message) {
      console.log("onMessageArrived:" + message.payloadString);
    }

    function doFail(e) {
      console.log('error', e);
    }
    const client = new Paho.MQTT.Client('m16.cloudmqtt.com', 31145
      , "web_" + parseInt(Math.random() * 100, 10));
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    const options = {
      useSSL: true,
      userName: "hwfhdjmv",
      password: "YQ6CQXhui74F",
      onSuccess: onConnect,
      onFailure: doFail
    };

    client.connect(options);

    return client

  }
  _onPressOpen() {
    init({
      size: 10000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true,
      reconnect: true,
      sync: {}
    });

    function onConnect() {
      console.log("onConnect");

      const topic = "/light/in"
      const topicdos = "/light/out"
      client.subscribe(topicdos);
      message = new Paho.MQTT.Message("1");
      message.destinationName = topic;
      client.send(message);
    }

    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    function onMessageArrived(message) {
      console.log("onMessageArrived:" + message.payloadString);
    }

    function doFail(e) {
      console.log('error', e);
    }
    const client = new Paho.MQTT.Client('m16.cloudmqtt.com', 31145
      , "web_" + parseInt(Math.random() * 100, 10));
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    const options = {
      useSSL: true,
      userName: "hwfhdjmv",
      password: "YQ6CQXhui74F",
      onSuccess: onConnect,
      onFailure: doFail
    };

    client.connect(options);

    return client

  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Select what to do with the Garage's door</Text>
        </View>
        <View styles={styles.secondaryContainer}>
          <TouchableOpacity style={styles.gridItem}
            onPress={this._onPressOpen}>
            <View style={styles.gridItem} backgroundColor='#7dceff'>
              <View>
                <Text style={styles.title}>Open the garage's door</Text>
              </View>
              <Image style={styles.thumbnail} source={iconGarageOpen} />
              <View />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem}
            onPress={this._onPressClose}>
            <View style={styles.gridItem} backgroundColor='#7dceff'>
              <View>
                <Text style={styles.title}> Close the garage's door </Text>
              </View>
              <Image style={styles.thumbnail} source={iconGarageClosed} />
              <View />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
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
  secondaryContainer: {
    alignSelf: 'stretch',
    flex: 2,
    flexDirection: 'row',
  },
  gridItem: {
    alignItems: 'center',
    backgroundColor: '#cfedfc',
    borderRadius: 300,
    borderWidth: 2,
    height: 170,
    justifyContent: 'center',
    margin: 15,
    width: 170,
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
