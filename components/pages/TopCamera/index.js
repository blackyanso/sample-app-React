import React, {useRef, useState} from 'react'
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native'
import {RNCamera} from 'react-native-camera'
import {Colors} from 'react-native/Libraries/NewAppScreen'

import Tab from '../../modules/Tab/Tab'

export default function TopCamera(props) {
  const [isRecording, toggleRecording] = useState(false)
  const cameraRef = useRef(null)

  async function takePicture() {
    // https://qiita.com/hazigin/items/900d196fef0d85570ca8
    // https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md
    // https://qiita.com/arakappa/items/edd70ab9102a8566c145
    const options = {
      base64: true,
      width: 1024,
      height: 1024,
      exif: false,
      fixOrientation: true, // Android用
      forceUpOrientation: true // iOS用
    }
    if (cameraRef && cameraRef.current) {
      const shotData = await cameraRef.current.takePictureAsync(options)
      gotoFilter(shotData.base64)
    }
  }

  async function takeVideo() {
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
          console.log('takeVideo Path:', data.uri)
          toggleRecording(false)
          console.log('encodedPath:' + encodeURIComponent(data.uri))
          props.history.push(
            '/ChooseVideoFilter/' + encodeURIComponent(data.uri)
          )
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  async function stopVideo() {
    console.log('stop takeVideo')
    await cameraRef.current.stopRecording()
  }

  function gotoFilter(base64) {
    // Base64URL Encode
    // https://ja.wikipedia.org/wiki/Base64
    // https://akataworks.hatenadiary.jp/entry/2018/02/19/123524
    console.log('go to filter from top camera')
    props.history.push({
      pathname: '/ChooseFilter',
      state: {base64}
    })
  }

  return (
    <>
      <Tab history={props.history} />
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
        <View style={styles.buttonArea}>
          {isRecording ? (
            <StopRecBtn action={stopVideo} />
          ) : (
            <StartRecBtn action={takeVideo} />
          )}
          <TakePictureBtn action={takePicture} />
        </View>
      </View>
    </>
  )
}

function TakePictureBtn({action}) {
  return (
    <View style={styles.shutterButton}>
      <TouchableOpacity onPress={action}>
        <Image source={require('./shutter.png')} />
      </TouchableOpacity>
    </View>
  )
}

function StartRecBtn({action}) {
  return (
    <View style={styles.recordButton}>
      <TouchableOpacity onPress={action}>
        <Text style={styles.recordButtonStart}>録画開始</Text>
      </TouchableOpacity>
    </View>
  )
}

function StopRecBtn({action}) {
  return (
    <View style={styles.recordButton}>
      <TouchableOpacity onPress={action}>
        <Text style={styles.recordButtonStop}>録画終了</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white
  },
  padding: {
    padding: 20,
    paddingTop: 0
  },
  waringText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'red'
  },
  buttonArea: {
    marginTop: 40,
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  shutterButton: {
    alignContent: 'center'
  },
  recordButton: {
    position: 'absolute',
    right: 0
  },
  recordButtonStart: {
    width: 40,
    height: 40,
    fontSize: 12,
    lineHeight: 14,
    backgroundColor: '#0c0',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
    borderRadius: 20,
    color: '#fff'
  },
  recordButtonStop: {
    width: 40,
    height: 40,
    fontSize: 12,
    lineHeight: 14,
    backgroundColor: '#c00',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
    borderRadius: 20,
    color: '#fff'
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
