import React from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import {Link} from 'react-router-native'

export default function GalleryPreview(props) {
  const styles = StyleSheet.create({
    imagePreview: {
      width: 330,
      height: 330
    },
    back: {
      color: '#ADD8E6',
      fontSize: 20,
      margin: 5
    }
  })
  const imageUrl = props.location.state.url
  console.log(imageUrl)

  return (
    <View>
      <Link to={{pathname: '/Gallery'}}>
        <Text style={styles.back}>◀</Text>
      </Link>
      <Image style={styles.imagePreview} source={{uri: imageUrl}} />
    </View>
  )
}
