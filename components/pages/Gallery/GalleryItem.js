import React from 'react'
import {Dimensions, StyleSheet, Image, View} from 'react-native'
import {Link} from 'react-router-native'

export default function GalleryItem(props) {
  const item = props.value
  return (
    <View>
      <Link
        to={{
          pathname: '/GalleryPreview',
          state: {url: item.previewImage}
        }}>
        <Image
          style={styles.image}
          source={{
            uri: item.thumbnail
          }}
        />
      </Link>
    </View>
  )
}

const {width} = Dimensions.get('window')
const imageSide = (width - 40 - 10 * 2) / 3

const styles = StyleSheet.create({
  image: {
    width: imageSide,
    height: imageSide,
    marginBottom: 10
  }
})
