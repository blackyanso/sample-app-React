import React, {useState, useEffect} from 'react'
import {Text, ScrollView, View, StyleSheet} from 'react-native'
import axios from 'axios'

import GalleryItem from './GalleryItem'

export default function Gallery() {
  const [items, setItems] = useState([])

  async function init() {
    const apiUrl = 'https://uki213.github.io/sample-app-Pwa/api/gallery.json'
    const result = await axios.get(apiUrl)
    setItems(result.data.items)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Text>Gallery</Text>
      <ScrollView>
        <View style={styles.gallery} accessible={true}>
          {items.map((item, index) => {
            return <GalleryItem value={item} key={index} />
          })}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})
