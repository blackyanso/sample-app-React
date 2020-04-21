import React from 'react'
import {View, Image, StyleSheet} from 'react-native'

import HistoryBack from '../../modules/HistoryBack/HistoryBack'

export default function GalleryPreview(props) {
  const styles = StyleSheet.create({
    imagePreview: {
      width: '100%',
      aspectRatio: 1
    }
  })
  const imageUrl = props.location.state.url

  return (
    <View>
      <HistoryBack goBack={props.history.goBack} />
      <Image style={styles.imagePreview} source={{uri: imageUrl}} />
    </View>
  )
}
