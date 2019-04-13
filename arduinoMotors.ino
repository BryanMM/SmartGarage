#include <Adafruit_VC0706.h>
#include <SoftwareSerial.h>
const int rightForward = 4;
const int rightBackward = 5;
const int incomeCommandOne = 6;
const int incomeCommandTwo = 7;
const int cameraCondition = 9;
int lastStatus = 0;
#include <SD.h>
#include <SPI.h>
int cs = 10;
SoftwareSerial cameraconnection = SoftwareSerial(2, 3);
Adafruit_VC0706 cam = Adafruit_VC0706(&cameraconnection);
 
void setup() 
{
  Serial.begin(9600);
  if (cam.begin()) {
    Serial.println("Camera Found:");
  } else {
    Serial.println("No camera found?");
    return;
  }
  // Print out the camera version information (optional)
  char *reply = cam.getVersion();
  if (reply == 0) {
    Serial.print("Failed to get version");
  } else {
    Serial.println("-----------------");
    Serial.print(reply);
    Serial.println("-----------------");
  }

  // Set the picture size - you can choose one of 640x480, 320x240 or 160x120 
  // Remember that bigger pictures take longer to transmit!
  
  cam.setImageSize(VC0706_640x480);        // biggest
  //cam.setImageSize(VC0706_320x240);        // medium
  //cam.setImageSize(VC0706_160x120);          // small

  // You can read the size back from the camera (optional, but maybe useful?)
  uint8_t imgsize = cam.getImageSize();
  Serial.print("Image size: ");
  if (imgsize == VC0706_640x480) Serial.println("640x480");
  if (imgsize == VC0706_320x240) Serial.println("320x240");
  if (imgsize == VC0706_160x120) Serial.println("160x120");


  pinMode(incomeCommandOne, INPUT);
  pinMode(incomeCommandTwo, INPUT);
  pinMode(cameraCondition, INPUT);
  pinMode(rightForward , OUTPUT);
  pinMode(rightBackward , OUTPUT);
 
}
 
void loop()
{
  checkIncomeCommands();
  
}

void checkIncomeCommands() {
  int firstCondition = digitalRead(incomeCommandOne);
  int secondCondition = digitalRead(incomeCommandTwo );
  int cameraValue = digitalRead(cameraCondition);
  if(cameraValue == HIGH) {
    takePicture();
  }
  if (firstCondition == HIGH && secondCondition == LOW && lastStatus == 1) {
      openGarage();
  }
  else if (firstCondition == LOW && secondCondition == HIGH && lastStatus == 0) {
      closeGarage();
  }
  else {
  }
}

//closes the garage's door
void closeGarage() {
  lastStatus = 1;
  Serial.println(" closing the door");
  digitalWrite(rightForward , HIGH);
  digitalWrite(rightBackward , LOW);
  delay(400);
  digitalWrite(rightForward, LOW);
  digitalWrite(rightForward, LOW); 
}

//opens the garage's door
void openGarage() {
  lastStatus = 0;
  Serial.println(" opening the door");
  digitalWrite(rightForward, LOW);
  digitalWrite(rightBackward, HIGH);
  delay(600);
    digitalWrite(rightForward, LOW);
  digitalWrite(rightBackward, LOW);
  Serial.println("done opening the garage");
}
void takePicture() {
  if (! cam.takePicture()) 
    Serial.println("Failed to snap!");
  else 
    Serial.println("Picture taken!");
  char filename[13];
  strcpy(filename, "IMAGE00.JPG");
  for (int i = 0; i < 100; i++) {
    filename[5] = '0' + i/10;
    filename[6] = '0' + i%10;
    // create if does not exist, do not open existing, write, sync after write
    if (! SD.exists(filename)) {
      break;
    }
  }
  
  // Open the file for writing
  File imgFile = SD.open(filename, FILE_WRITE);

  // Get the size of the image (frame) taken  
  uint16_t jpglen = cam.frameLength();
  Serial.print("Storing ");
  Serial.print(jpglen, DEC);
  Serial.print(" byte image.");

  int32_t time = millis();
  pinMode(8, OUTPUT);
  // Read all the data up to # bytes!
  byte wCount = 0; // For counting # of writes
  while (jpglen > 0) {
    // read 32 bytes at a time;
    uint8_t *buffer;
    uint8_t bytesToRead = min(32, jpglen); // change 32 to 64 for a speedup but may not work with all setups!
    buffer = cam.readPicture(bytesToRead);
    imgFile.write(buffer, bytesToRead);
    if(++wCount >= 64) { // Every 2K, give a little feedback so it doesn't appear locked up
      Serial.print('.');
      wCount = 0;
    }
    //Serial.print("Read ");  Serial.print(bytesToRead, DEC); Serial.println(" bytes");
    jpglen -= bytesToRead;
  }
  imgFile.close();

  time = millis() - time;
  Serial.println("done!");
  Serial.print(time); Serial.println(" ms elapsed");
}
