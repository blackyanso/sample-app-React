import React, {useState, useEffect} from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import {Link} from 'react-router-native'
import axios from 'axios'

export default function Gallery() {
  const styles = StyleSheet.create({
    gallery: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    image: {
      width: 100,
      height: 100
    }
  })

  const [items, setItems] = useState([])

  async function init() {
    const apiUrl = 'https://uki213.github.io/sample-app-Pwa/api/gallery.json'
    const result = await axios.get(apiUrl)
    setItems(result.data.items)
  }

  // asynchronous tasks in a useEffect cleanup function
  useEffect(() => {
    init()
  })

  return (
    <View>
      <Text>Gallery</Text>
      <View style={styles.gallery} accessible={true}>
        {items.map((item, index) => {
          return (
            <Link
              to={{
                pathname: '/GalleryPreview',
                state: {url: item.previewImage}
              }}>
              <Image
                key={index}
                style={styles.image}
                source={{
                  uri: item.thumbnail
                }}
              />
            </Link>
          )
        })}
      </View>
    </View>
  )
}
