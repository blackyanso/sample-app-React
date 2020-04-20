import React from 'react'
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native'
import {NativeRouter, Route, Link} from 'react-router-native'

import TopCamera from './components/pages/TopCamera/index'
import ChooseFilter from './components/pages/ChooseFilter/index'
import Gallery from './components/pages/Gallery/index'
import GalleryPreview from './components/pages/GalleryPreview/index'

export default function HelloWorldApp() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <NativeRouter>
        <View style={styles.debug}>
          <Link to="/">
            <Text>TopCamera</Text>
          </Link>
          <Link to="/ChooseFilter/base64SampleCode">
            <Text>ChooseFilter</Text>
          </Link>
          <Link to="/Gallery">
            <Text>Gallery</Text>
          </Link>
          <Link to="/GalleryPreview">
            <Text>GalleryPreview</Text>
          </Link>
        </View>
        <View style={styles.container}>
          <Route exact path="/" component={TopCamera} />
          <Route path="/ChooseFilter/:base64" component={ChooseFilter} />
          <Route path="/Gallery" component={Gallery} />
          <Route path="/GalleryPreview" component={GalleryPreview} />
        </View>
      </NativeRouter>
    </>
  )
}

const styles = StyleSheet.create({
  debug: {
    display: 'flex',
    backgroundColor: '#f0f0f0'
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})
