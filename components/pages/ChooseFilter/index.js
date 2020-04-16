import 'react-native-get-random-values'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {WebView} from 'react-native-webview'
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body></body>
</html>
`

export default function ChooseFilter() {
  return (
    <View>
      <Text>ChooseFilter</Text>
      <View style={styles.wrap}>
        <WebView scalesPageToFit={false} source={{html}} />
      </View>
      <Text>ChooseFilter</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: 0,
    height: 0
  }
})
