import React from 'react'
import {Text, View} from 'react-native'

export default function GalleryPreview(props) {
  const imageUrl = props.location.state.url
  console.log(imageUrl)

  return (
    <View>
      <Text>{imageUrl}</Text>
    </View>
  )
}
