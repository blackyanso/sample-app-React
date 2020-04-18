import React, {useRef, useState} from 'react'
import {Button, StyleSheet, View} from 'react-native'
import {RNCamera} from 'react-native-camera'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const TopCamera = () => {
  const [isRecording, toggleRecording] = useState(false)
  const cameraRef = useRef(null)

  const takePicture = async () => {
    // https://qiita.com/hazigin/items/900d196fef0d85570ca8
    // https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md
    // https://qiita.com/arakappa/items/edd70ab9102a8566c145
    const options = {
      base64: true,
      width: 320,
      height: 320
    }
    if (cameraRef && cameraRef.current) {
      const shotData = await cameraRef.current.takePictureAsync(options)
      console.log('base64 log:', shotData.base64)
    }
  }

  const takeVideo = async () => {
    const options = {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p']
    }

    if (cameraRef && cameraRef.current && !isRecording) {
      try {
        const promise = cameraRef && cameraRef.current.recordAsync(options)

        if (promise) {
          console.log('start takeVideo')
          toggleRecording(true)
          const data = await promise
          console.log('takeVideo', data)
          toggleRecording(false)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const stopVideo = async () => {
    console.log('stop takeVideo')
    await cameraRef.current.stopRecording()
  }

  return (
    <View style={styles.padding}>
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
        ratio="1:1"
      />
      <TakePictureBtn action={takePicture} />
      {isRecording ? (
        <StopRecBtn action={stopVideo} />
      ) : (
        <StartRecBtn action={takeVideo} />
      )}
    </View>
  )
}

const TakePictureBtn = ({action}) => {
  return (
    <View style={styles.marginVertical}>
      <Button onPress={action} title="撮影" />
    </View>
  )
}

const StartRecBtn = ({action}) => {
  return (
    <View style={styles.marginVertical}>
      <Button onPress={action} title="録画開始" />
    </View>
  )
}

const StopRecBtn = ({action}) => {
  return (
    <View style={styles.marginVertical}>
      <Button onPress={action} title="録画終了" />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white
  },
  padding: {
    padding: 20
  },
  marginVertical: {
    marginTop: 10,
    marginBottom: 10
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
