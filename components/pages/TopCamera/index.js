import React, {useState, useRef} from 'react'
import {
  Button,
  Platform,
  NativeModules,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import {RNCamera} from 'react-native-camera'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const TopCamera = () => {
  const cameraRef = useRef(null)
  const [isRecording, toggleRecording] = useState(false)

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
      console.log('uri:', shotData.uri)
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
          // console.log('takeVideo', data)
          // await convertToMp4(data.uri)
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

  // const convertToMp4 = async (path: string) => {
  //   console.log('convert from .mov to .mp4')
  //   console.log('path:', path)
  //   if (Platform.OS === 'ios') {
  //     const result = await NativeModules.ConvertToMp4.convert(path).catch(
  //       (err: any) => {
  //         console.log(err)
  //       }
  //     )
  //
  //     console.log(result)
  //   }
  // }

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
      <Button onPress={takePicture} title="写真撮影" />
      {isRecording ? (
        <RenderStopRecBtn action={stopVideo} />
      ) : (
        <RenderRecBtn action={takeVideo} />
      )}
    </View>
  )
}

type buttonAction = () => void
interface RecordProps {
  action: buttonAction;
}
const RenderRecBtn: React.SFC<RecordProps> = ({action}) => {
  return <Button onPress={action} title="動画撮影開始" />
}

const RenderStopRecBtn: React.SFC<RecordProps> = ({action}) => {
  return <Button onPress={action} title="動画撮影終了" />
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
