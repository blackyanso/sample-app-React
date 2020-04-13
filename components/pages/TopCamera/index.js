import React from 'react'
import {Text, View, StyleSheet, Button} from 'react-native'
import {RNCamera} from 'react-native-camera'

export default function TopCamera() {
  async function shotPictire(a) {
    const options = {
      quality: 0.95,
      base64: true,
      width: 320,
      height: 320
    }
    const shotData = await this.camera.takePictureAsync(options)
    console.log(shotData.base64)
  }

  return (
    <View>
      <Text>TopCamera</Text>
      <RNCamera
        ref={ref => {
          this.camera = ref
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel'
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes)
        }}
        ratio="1:1"
      />
      <Button title="撮影" onPress={shotPictire.bind(this)} />
    </View>
  )
}

const styles = StyleSheet.create({
  preview: {
    width: 320,
    height: 320
  }
})
