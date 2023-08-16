import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useRef, useState, } from 'react'
import ImageCropPicker from 'react-native-image-crop-picker'
import InputComponent from '../components/InputComponent'
import SelectDropdown from 'react-native-select-dropdown'
import { MediaComponent } from '../components/MediaComponent';
import { categoryList } from '../data/Data'
import { FlatList } from 'react-native-gesture-handler'
import { olahragaList } from '../data/DataFreeTraining'
import realm from '../../store/realm'
import { ButtonComponent } from '../components/ButtonComponent'

const EditProductScreen = (props) => {
    const { navigation } = props

    return (

        <View style={styles.mainContainer}>
            <FlatList
                data={olahragaList}
                contentContainerStyle={styles.flatListContainer}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('DetailTraining', { id: item.id })}>
                                    <Image
                                        style={styles.imagee}
                                        source={{ uri: item.image }}
                                    />
                                    <Text style={styles.textt}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                            </View>

                        </View>

                    )
                }}
            />
        </View>
    )
}


export default EditProductScreen
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //warna background
    },
    imagee: {
        marginTop: 13,
        marginLeft: 20,
        width: 300,
        height: 200
    },
    textt: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 18
    },
    flatListContainer: {
        padding: 8
    },
})