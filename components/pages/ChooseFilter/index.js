import 'react-native-get-random-values'
import React, {useState} from 'react'
import {StyleSheet, Switch, Text, View, Image, ScrollView} from 'react-native'
import {WebView} from 'react-native-webview'

import sample64 from './sample64'

export default function({match}) {
  const [imageData, setImageData] = useState()

  const styles = StyleSheet.create({
    wrap: {
      width: '100%',
      height: 50
    },
    image: {
      width: 300,
      height: 300
    }
  })

  const html = /*html*/ `
    <body>aaa</body>
    <script src="https://cdn.rawgit.com/girliemac/filterous-2/1fc15582/demo-browser/filterous2.min.js"></script>
    <script>
      const baseData = '${sample64}'

      function filter(filterStyle) {
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

      filter('1977')
    </script>
  `
  function decodeBase64(base64) {
    return base64.replace(/-/g, '+').replace(/_/g, '/')
  }

  function filtered(event) {
    const {data} = event.nativeEvent
    setImageData(data)
  }

  return (
    <ScrollView>
      <Switch />
      <Image style={styles.image} source={{uri: imageData}} />
      <Text>ChooseFilter</Text>
      <View style={styles.wrap}>
        <WebView
          scalesPageToFit={false}
          source={{html}}
          onMessage={filtered}
          mixedContentMode={'always'}
        />
      </View>
      <Text>ChooseFilter</Text>
      <Text>Base64: {decodeBase64(match.params.base64)}</Text>
    </ScrollView>
  )
}
