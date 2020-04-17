import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {Link} from 'react-router-native'

export default function() {
  return (
    <View style={styles.debug}>
      <Link to={{pathname: '/'}}>
        <Text>TopCamera</Text>
      </Link>
      <Link to={{pathname: '/ChooseFilter'}}>
        <Text>ChooseFilter</Text>
      </Link>
      <Link to={{pathname: '/Gallery'}}>
        <Text>Gallery</Text>
      </Link>
      <Link to={{pathname: '/GalleryPreview'}}>
        <Text>GalleryPreview</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  debug: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd'
  }
})
