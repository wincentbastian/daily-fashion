import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { categoryList, imageSlider } from '../data/Data'

const HomeScreen = (props) => {
    const {navigation} = props
    return (
        <View style={styles.mainContainer}>
            <SliderBox
                images={imageSlider}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={250}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.text}>
                    Category
                </Text>
            </View>
            <FlatList
                data={categoryList}
                key={3}
                numColumns={3}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContainer}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShowProduct', {categoryId: item.id})}>
                            <Image
                                source={{ uri: item.icon }}
                                style={styles.icon}
                            />
                            <Text style={styles.itemName}>{item.name}</Text>
                        </TouchableOpacity>)
                }}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    titleContainer: {
        marginTop: 16,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    flatListContainer: {
        padding: 8
    },
    button: {
        flex: 1,
        margin: 8,
        borderWidth: 1,
        borderColor: '#7CAF58',
        borderRadius: 10,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    itemName: {
        color: 'black'
    }
})