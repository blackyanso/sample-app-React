import React, {useRef} from 'react'
import {Button, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native'
import {RNCamera} from 'react-native-camera'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const TopCamera = () => {
  const cameraRef = useRef(null)

  const takePicture = async () => {
    // https://qiita.com/hazigin/items/900d196fef0d85570ca8
    // https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md
    // https://qiita.com/arakappa/items/edd70ab9102a8566c145
    const options = {
      quality: 0.95,
      base64: true,
      width: 320,
      height: 320
    }
    if (cameraRef && cameraRef.current) {
      const shotData = await cameraRef.current.takePictureAsync(options)
      console.log('base64 log:', shotData.base64)
    }
  }

  return (
    <View>
      <RNCamera
        ref={cameraRef}
        style={styles.cameraPreview}
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
      <Button onPress={takePicture} title="撮影" />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white
  },
  padding: {
    padding: 10
  },
  waringText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'red'
  },
  cameraContainer: {
    zIndex: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraPreview: {
    zIndex: 0,
    width: '100%',
    aspectRatio: 1 // Androidではここでのプレビュー画面の比率の指定が効かない...
  }
})

export default TopCamera
