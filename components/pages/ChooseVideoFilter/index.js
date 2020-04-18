import React from 'react'
import {Text, View, Button} from 'react-native'
import {RNFFmpeg} from 'react-native-ffmpeg'

const ChooseVideoFilter = ({match}) => {
  const inputFile = decodeURIComponent(match.params.filePath).replace(
    /file:\/\//g,
    ''
  )
  const onFilter = async () => {
    const outputFile = inputFile.replace('.mov', '.mp4')
    // モノクロフィルター加工
    // https://video.stackexchange.com/questions/27744/how-to-monochrome-haze-video-effect-in-ffmpeg
    const executeCommand = `-i ${inputFile} -vf hue=s=0 -pix_fmt yuv420p ${outputFile}`
    await RNFFmpeg.execute(executeCommand).then((result) =>
      console.log('FFmpeg process exited with rc ' + result.rc)
    )
  }

  return (
    <View>
      <Text>Video Filter</Text>
      <Text>{inputFile}</Text>
      <Button title="フィルター加工" onPress={() => onFilter()} />
    </View>
  )
}

export default ChooseVideoFilter
