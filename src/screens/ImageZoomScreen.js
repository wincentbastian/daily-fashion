import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, {useEffect} from 'react'
import ImageZoom from 'react-native-image-pan-zoom'

const ImageZoomScreen = (props) => {

    const {route} = props;

    const imageSource = route.params.imagePath

    useEffect(() => {
        console.log(imageSource)
    })

  return (
    <View style={styles.mainContainer}>
      <ImageZoom
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={Dimensions.get('window').width}
      imageHeight={Dimensions.get('window').width}
      >
        <Image
        style={styles.image}
        source={{uri: imageSource}}
        />
      </ImageZoom>
    </View>
  )
}

export default ImageZoomScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'black'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})