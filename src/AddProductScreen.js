import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ImageCropPicker from 'react-native-image-crop-picker'
import InputComponent from './components/InputComponent'
import SelectDropdown from 'react-native-select-dropdown'
import { categoryList } from './data/Data'
import realm from '../store/realm'

const AddProductScreen = () => {
    const [productData, setProductData] = useState(
        {
            productName: '',
            imagePath: '',
            category: null,
            description: '',
            price: null,
            instagram: '',
            facebook: '',
            phoneNumber: ''
        }
    )

    const dropdownRef = useRef({})

    const addImage = () => {
        ImageCropPicker.openPicker({
            width: 2000,
            height: 2000,
            cropping: true
        }).then(image => {
            setProductData({ ...productData, imagePath: image.path })
        }).catch(errorMessage => {
            console.log(errorMessage)
        })
    }

    const onInputChange = (type, value) => {
        setProductData({
            ...productData, [type]: value
        })
    }

    const saveData = () => {
        if (productData.productName === '' || productData.imagePath === '' || productData.description === '' || productData.price === '' || productData.category === null) {
            alert('Please fill product name')
        } else if (productData.phoneNumber === '' && productData.instagram === '' && productData.facebook === '') {
            alert('Please fill at least one seller contact!');
        } else {
            const allData = realm.objects('Product')
            const lastId = allData.length === 0 ? 0 : allData[allData.length - 1].id

            realm.write(() => {
                realm.create('Product', {
                    id: lastId + 1,
                    productName: productData.productName,
                    imagePath: productData.imagePath,
                    category: productData.category,
                    description: productData.description,
                    price: parseInt(productData.price),
                    instagram: productData.instagram,
                    facebook: productData.facebook,
                    phoneNumber: productData.phoneNumber
                })
            })

            setProductData({
                productName: '',
                imagePath: '',
                category: null,
                description: '',
                price: '',
                instagram: '',
                facebook: '',
                phoneNumber: '',
            });


            dropdownRef.current.reset()
        }
    }

    useEffect(() => {
        const allData = realm.objects('Product')
        console.log(allData)
    })

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scroll}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => addImage()}>
                        <Image
                            style={productData.imagePath !== '' ? styles.imageStyleNull : styles.imageStyle}
                            source={{
                                uri: productData.imagePath !== '' ? productData.imagePath : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1024px-Antu_insert-image.svg.png?20160706115716"
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.horizontalContainer}>
                    <InputComponent
                        placeholder="Product Name"
                        value={productData.productName}
                        onChangeText={(text) => onInputChange('productName', text)}
                    />
                    <SelectDropdown
                        data={categoryList}
                        defaultButtonText='Select Category'
                        onSelect={(item) => {
                            onInputChange('category', item.id)
                        }}
                        buttonTextAfterSelection={(item) => {
                            return item.name
                        }}
                        rowTextForSelection={(item) => {
                            return item.name
                        }}
                        buttonStyle={styles.selectDropdown}
                        buttonTextStyle={styles.selectText}
                        ref={dropdownRef}
                    />
                </View>
                <View style={styles.horizontalContainer}>
                    <InputComponent
                        placeholder="Description"
                        value={productData.description}
                        onChangeText={(text) => onInputChange('description', text)}
                        isDescription={true}
                    />
                    <InputComponent
                        placeholder="Price"
                        value={productData.price}
                        onChangeText={(text) => onInputChange('price', text)}
                        isIcon={true}
                        name="dollar"
                        type="font-awesome"
                    />
                </View>
                <Text style={styles.sellerText}>Seller Contact</Text>
                <InputComponent
                    placeholder="wa number"
                    value={productData.phoneNumber}
                    onChangeText={(text) => onInputChange('phoneNumber', text)}
                    isIcon={true}
                    name="whatsapp"
                    type="font-awesome"
                />
                <InputComponent
                    placeholder="instagram"
                    value={productData.instagram}
                    onChangeText={(text) => onInputChange('instagram', text)}
                    isIcon={true}
                    name="instagram"
                    type="font-awesome"
                />
                <InputComponent
                    placeholder="facebook"
                    value={productData.facebook}
                    onChangeText={(text) => onInputChange('facebook', text)}
                    isIcon={true}
                    name="facebook-square"
                    type="font-awesome"
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton}
                        onPress={() => saveData()}
                    >
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default AddProductScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    scroll: {
        margin: 8,
        paddingBottom: 8,
    },
    imageStyleNull: {
        width: 50,
        height: 50,
    },
    imageStyle: {
        width: 200,
        height: 200,
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 8,
    },
    imageButton: {
        width: 200,
        height: 200,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    sellerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 8,
        marginBottom: 0,
        color: 'black'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8
    },
    saveButton: {
        marginTop: 16,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'mistyrose'
    },
    saveText: {
        color: 'black'
    },
    selectDropdown: {
        borderRadius: 10,
        backgroundColor: 'skyblue',
        width: 150,
        height: 30,
        marginLeft: 8
    },
    selectText: {
        fontSize: 12
    }

})