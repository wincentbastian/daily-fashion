import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, CheckBox } from 'react-native-elements'
import { MediaComponent } from '../components/MediaComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen-hooks';
import { SliderBox } from 'react-native-image-slider-box'
import { categoryList, imageSliderr } from '../data/Data'
import { olahragaList, imageSlider } from '../data/DataFreeTraining';
import realm from '../../store/realm';

const ShowProductScreen = (props) => {
  const { navigation } = props
  const [data,setData] = useState([])
  const [final, setFinal] = useState([])

  useEffect(() => {
    setData(realm.objects('Training'));
    const training = data
    const final = [...training].sort((a, b) => b.id - a.id)
    const newData = final.map((item) => {
        item.checkedStatus = false
        return item
    })
    setFinal(newData)
}, []);

  const getCurrentDate = () => {
    const months = [
        "January", "February",
        "March", "April", "May",
        "June", "July", "August",
        "September", "October",
        "November", "December"
    ];
    const currentDate = new Date();
    const dateOnly = currentDate.getDate();
    const monthOnly = currentDate.getMonth();
    const yearOnly = currentDate.getFullYear();
    return months[monthOnly] + ' ' + dateOnly + ', ' + yearOnly;
};
  return (
    <View style={styles.mainContainer}>
      <SliderBox
        images={imageSlider}
        autoplay={true}
        circleLoop={true}
        sliderBoxHeight={200}
      />
      <FlatList
        data={olahragaList}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Text></Text>
          )
        }}
        ListEmptyComponent={
          <Text>Belum Olahraga</Text>
        }
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton} onPress={() => navigation.navigate('EditProduct')}
        >
          <Icon
            name="plus"
            type="antdesign"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ShowProductScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //warna background
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16
  },
  addButton: {
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 100
  }
})