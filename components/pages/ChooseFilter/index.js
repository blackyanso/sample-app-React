import 'react-native-get-random-values'
import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  Switch,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import {WebView} from 'react-native-webview'
import filterous from './filterous2.js'

import axios from 'axios'

import HistoryBack from '../../modules/HistoryBack/HistoryBack'

export default function(props) {
  const imageBase64 = 'data:image/jpeg;base64,' + props.location.state.base64
  const [imageData, setImageData] = useState(imageBase64)
  const [filter, setFilter] = useState('normal')
  const [toggleStatus, setToggleStatus] = useState(false)

  const styles = StyleSheet.create({
    wrap: {
      width: 0,
      height: 0
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: '#707070',
      marginBottom: 44
    },
    imageWrap: {
      padding: 20,
      paddingTop: 0,
      paddingBottom: 0
    },
    toggle: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    toggleText: {
      fontSize: 30
    },
    buttonArea: {
      marginTop: 40,
      alignItems: 'center'
    },
    button: {
      color: '#fff',
      fontSize: 30,
      backgroundColor: '#7CBFD8',
      width: 140,
      height: 50,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderRadius: 5
    }
  })

  const html = /*html*/ `
    <script>
      ${filterous}
      const baseData = '${imageBase64}'

      function filter() {
        const filterStyle = '${filter}'
        const resultImage = new Image()
        const baseImage = new Image()
        baseImage.src = baseData

        resultImage.onload = () => {
          window.ReactNativeWebView.postMessage(resultImage.src)
        }

        filterous
          .importImage(baseImage)
          .applyInstaFilter(filterStyle)
          .renderHtml(resultImage)
      }
      filter()
    </script>
  `

  function filtered(event) {
    const {data} = event.nativeEvent
    setImageData(data)
  }

  function changeToggle(e) {
    setToggleStatus(e)
    if (!toggleStatus) {
      setFilter('1977')
    } else {
      setFilter('normal')
    }
  }

  function submit() {
    axios
      .get('https://uki213.github.io/sample-app-Pwa/api/upload.json')
      .then(result => {
        console.log(result.status, imageData)
      })
  }

  return (
    <ScrollView>
      <HistoryBack goBack={props.history.goBack} />
      <View style={styles.wrap}>
        <WebView
          scalesPageToFit={false}
          source={{html}}
          onMessage={filtered}
          mixedContentMode={'always'}
        />
      </View>
      <View style={styles.imageWrap}>
        <Image style={styles.image} source={{uri: imageData}} />
        <View style={styles.toggle}>
          <Text style={styles.toggleText}>画像フィルター</Text>
          <Switch value={toggleStatus} onValueChange={changeToggle} />
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity onPress={submit}>
            <Text style={styles.button}>登録</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
