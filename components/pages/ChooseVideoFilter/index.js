import React from 'react'
import {Text, View, Button} from 'react-native'
import {RNFFmpeg} from 'react-native-ffmpeg'

import HistoryBack from '../../modules/HistoryBack/HistoryBack'

export default function ChooseVideoFilter({match, history}) {
  const inputFile = decodeURIComponent(match.params.filePath).replace(
    /file:\/\//g,
    ''
  )
  async function onFilter() {
    // Androidはデフォルト撮影したものが.mp4で同名では上書きができないことを考慮してファイル名を変更
    let outputFile = inputFile.replace('.mov', '.mp4')
    outputFile = outputFile.replace('.mp4', '.filter.mp4')
    // モノクロフィルター加工
    // https://video.stackexchange.com/questions/27744/how-to-monochrome-haze-video-effect-in-ffmpeg
    const executeCommand = `-i ${inputFile} -y -vf hue=s=0 -pix_fmt yuv420p ${outputFile}`
    const result = await RNFFmpeg.execute(executeCommand)
    console.log('FFmpeg process exited with rc ' + result.rc)
  }

  return (
    <View>
      <HistoryBack goBack={history.goBack} />
      <Text>{inputFile}</Text>
      <Button title="フィルター加工" onPress={() => onFilter()} />
    </View>
  )
}
