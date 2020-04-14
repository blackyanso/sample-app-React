import React from 'react'
import {StyleSheet, View, StatusBar, SafeAreaView} from 'react-native'
import {NativeRouter, Route} from 'react-router-native'

import DebugNavi from './components/commons/DebugNavi'

import TopCamera from './components/pages/TopCamera/index'
import ChooseFilter from './components/pages/ChooseFilter/index'
import Gallery from './components/pages/Gallery/index'
import GalleryPreview from './components/pages/GalleryPreview/index'

export default function HelloWorldApp() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <DebugNavi />
        <NativeRouter>
          <View style={styles.container}>
            <Route exact path="/" component={TopCamera} />
            <Route path="/ChooseFilter" component={ChooseFilter} />
            <Route path="/Gallery" component={Gallery} />
            <Route path="/GalleryPreview" component={GalleryPreview} />
          </View>
        </NativeRouter>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})
