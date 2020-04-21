import React from 'react'
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native'

export default function(props) {
  const styles = StyleSheet.create({
    wrap: {
      paddingTop: 14,
      paddingBottom: 14,
      borderBottomWidth: 1,
      borderBottomColor: '#707070',
      marginBottom: 44
    },
    linkArea: {
      width: 30
    },
    icon: {
      width: 30,
      height: 30
    }
  })

  function goBack() {
    props.goBack()
  }

  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={goBack} style={styles.linkArea}>
        <Image source={require('./HistoryBack.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}
