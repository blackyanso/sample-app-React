import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

export default function(props) {
  const pathname = props.history.location.pathname

  function isActivePath(path) {
    return pathname === path ? 'tabActive' : 'tab'
  }

  function changeTab(path) {
    if (pathname !== path) {
      props.history.replace(path)
    }
  }

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        style={styles[isActivePath('/')]}
        onPress={() => changeTab('/')}>
        <Text style={styles.text}>カメラ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles[isActivePath('/Gallery')]}
        onPress={() => changeTab('/Gallery')}>
        <Text style={styles.text}>ギャラリー</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    width: '100%',
    marginBottom: 44
  },
  tab: {
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#707070',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#E1F3F9',
    marginBottom: -1,
    marginRight: 10
  },
  tabActive: {
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#707070',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 0,
    backgroundColor: Colors.white,
    marginBottom: -1,
    marginRight: 10
  },
  text: {
    height: 48,
    width: 148,
    fontSize: 20,
    color: '#707070',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})
