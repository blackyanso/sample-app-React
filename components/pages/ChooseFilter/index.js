import 'react-native-get-random-values'
import React, {useState} from 'react'
import {StyleSheet, Switch, Text, View, Image, ScrollView} from 'react-native'
import {WebView} from 'react-native-webview'

// import sample64 from './sample64'

export default function({match}) {
  const imageBase64 =
    'data:image/jpeg;base64,' + decodeBase64(match.params.base64)
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
      aspectRatio: 1
    }
  })

  const html = /*html*/ `
    <script src="https://cdn.rawgit.com/girliemac/filterous-2/1fc15582/demo-browser/filterous2.min.js"></script>
    <script>
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

  function decodeBase64(base64) {
    return base64.replace(/-/g, '+').replace(/_/g, '/')
  }

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

  return (
    <ScrollView>
      <Text>ChooseFilter</Text>
      <Image style={styles.image} source={{uri: imageData}} />
      <View>
        <Switch value={toggleStatus} onValueChange={changeToggle} />
      </View>
      <View style={styles.wrap}>
        <WebView
          scalesPageToFit={false}
          source={{html}}
          onMessage={filtered}
          mixedContentMode={'always'}
        />
      </View>
    </ScrollView>
  )
}
