import React, {useState, useEffect} from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import axios from 'axios'

export default function Gallery() {
  const styles = StyleSheet.create({
    gallery: {
      flex: 3,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'stretch'
    },
    image: {
      width: '100%',
      height: '100%'
    }
  })

  const [items, setItems] = useState([])

  async function init() {
    const apiUrl = 'https://uki213.github.io/sample-app-Pwa/api/gallery.json'
    const result = await axios.get(apiUrl)
    setItems(result.data.items)
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={styles.gallery}>
      {items.map((item, index) => {
        return (
          <Image
            style={styles.image}
            key={index}
            source={{
              uri: item.thumbnail
            }}
          />
        )
      })}
    </View>
  )
}
