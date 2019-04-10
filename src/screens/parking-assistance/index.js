import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header:null
  });

  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
  }
  _onStart () {
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
      client.subscribe(topic);
      message = new Paho.MQTT.Message("0");
      message.destinationName = topic;
      client.send(message);
    }

    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    function onMessageArrived(message) {
      alert("onMessageArrived:" + message.payloadString);
    }

    function doFail(e) {
      console.log('error', e);
    }
    const client = new Paho.MQTT.Client('m16.cloudmqtt.com', 32759, "web_" + parseInt(Math.random() * 100, 10));
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    const options = {
      useSSL: true,
      userName: "nfqtvzft",
      password: "hIKO1qM_BLi8",
      onSuccess: onConnect,
      onFailure: doFail
    };

    client.connect(options);

    return client
  }
  render() {
    _onStart();
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>

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
