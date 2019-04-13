#include <Adafruit_VC0706.h>
#include <SPI.h>
#include <SD.h>  
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define wifi_ssid "ARRIS-0F92"
#define wifi_password "artoz592437bam"
#include <SoftwareSerial.h>

#define mqtt_server "m16.cloudmqtt.com"
#define mqtt_port 11145
#define mqtt_user "hwfhdjmv"
#define mqtt_password "YQ6CQXhui74F"

#define in_topic "/light/in"
#define out_topic "/light/out"
#define firstCondition 4
#define secondCondition 16
#define leftSensor 14
#define bottomSensor 12
#define rightSensor 5
#define camTrigger 2

SoftwareSerial swSer(13, 14, false, 128);
Adafruit_VC0706 cam = Adafruit_VC0706(&swSer);

WiFiClient espClient;
PubSubClient client;

void setup() {
  Serial.begin(115200);
  pinMode(leftSensor, INPUT);
  pinMode(bottomSensor, INPUT);
  pinMode(rightSensor, INPUT);
  pinMode(firstCondition, OUTPUT);
  pinMode(secondCondition, OUTPUT);
  pinMode(camTrigger, OUTPUT);
  setup_wifi();
  client.setClient(espClient);
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println("Connecting to ");
  Serial.println(wifi_ssid);

  WiFi.begin(wifi_ssid, wifi_password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");
    // Attempt to connect
    // If you do not want to use a username and password, change next line to
    // if (client.connect("ESP8266Client")) {
    if (client.connect("ESP8266Client", mqtt_user, mqtt_password)) {
      Serial.println("connected");
    } else {
      Serial.println("failed, rc=");
      Serial.println(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
 Serial.println("Message arrived [");
 Serial.println(topic);
 Serial.println("] ");
 for (int i = 0; i < length; i++) {
  char receivedChar = (char)payload[i];
  Serial.println(receivedChar);
  if (receivedChar == '0')
    checkSides();
  if (receivedChar == '1')
    openGarage();
  if (receivedChar == '2')
    closeGarage();
  if (receivedChar == '3')
    takePicture();
 }
  
 Serial.println();
}

void loop() {
  
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  // Publishes a random 0 and 1 like someone switching off and on randomly (random(2))
  //client.publish(out_topic, String(random(2)).c_str(), true);
  //delay(1000);
  client.subscribe(in_topic);
  //delay(1000);
}

void checkSides () {
   int leftVal = digitalRead(leftSensor);
   int bottomVal = digitalRead(bottomSensor);
   int rightVal = digitalRead(rightSensor);
    if ( leftVal == LOW && bottomVal == HIGH && rightVal == HIGH) {
      client.publish(out_topic, "you're near the left!", true);
    }
    if ( leftVal == HIGH && bottomVal == LOW && rightVal == HIGH) {
      client.publish(out_topic, "you're near the bottom!", true);
    }
    if ( leftVal == HIGH && bottomVal == HIGH && rightVal == LOW) {
      client.publish(out_topic, "you're near the right!", true);
    }
     if ( leftVal == LOW && bottomVal == HIGH && rightVal == LOW) {
      client.publish(out_topic, "you're near the right and the left!", true);
    }
     if ( leftVal == HIGH && bottomVal == LOW && rightVal == LOW) {
      client.publish(out_topic, "you're near the bottom and the right!", true);
    }
    if ( leftVal == LOW && bottomVal == LOW && rightVal == HIGH) {
      client.publish(out_topic, "you're near the left and the bottom!", true);
    }
     if ( leftVal == LOW && bottomVal == LOW && rightVal == LOW) {
      client.publish(out_topic, "you're near all the walls!", true);
    }
    else {
      client.publish(out_topic, "safe", true);
      } 
}
void openGarage() {
   Serial.println("opening the garage door");
   digitalWrite(firstCondition, HIGH);
   digitalWrite(secondCondition, LOW);
}

void closeGarage() {
  Serial.println("closing the garage door");
   digitalWrite(firstCondition, LOW);
   digitalWrite(secondCondition, HIGH); 
}

void takePicture() {
   
}
