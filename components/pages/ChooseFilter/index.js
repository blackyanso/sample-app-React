import 'react-native-get-random-values'
import React, {useState} from 'react'
import {StyleSheet, Switch, View, Image, ScrollView} from 'react-native'
import {WebView} from 'react-native-webview'
import filterous from './filterous2.js'

import HistoryBack from '../../modules/HistoryBack'

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
      aspectRatio: 1
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

  return (
    <ScrollView>
      <HistoryBack goBack={props.history.goBack} />
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
