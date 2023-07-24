import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
Alert
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import InputComponent from '../components/InputComponent';
import SelectDropdown from 'react-native-select-dropdown';
import {categoryList} from '../data/Data';
import realm from '../../store/realm';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen-hooks'

const EditProductScreen = (props) => {
  const {route} = props;

  const productId = route.params.idProduct;

  const [productData, setProductData] = useState({
    productName: '',
    imagePath: '',
    category: null,
    description: '',
    price: null,
    instagram: '',
    facebook: '',
    phoneNumber: '',
  });

  const onInputChange = (type, value) => {
    setProductData({
        ...productData,
        [type]: value
    })
  }

  const addImage = () => {
    ImagePicker.openPicker({
   width: 2000,
   height: 2000,
   cropping: true
    }).then(image => {
    console.log(image)
   setProductData({
   ...productData,
   imagePath: image.path
    });
    }).catch(errorMessage => {
    console.log(errorMessage);
    });
   };

const saveData = () => {
    if (productData.productName === '' || productData.description === '') {
      alert('Please fill product name');
    } else {
        const updatedData = realm.objects('Product').filtered(`id = ${idProduct}`)[0]
        realm.write(() => {
            updatedData.productName = productData.productName;
            updatedData.imagePath = productData.imagePath;
            updatedData.category = productData.category;
            updatedData.description = productData.description;
            updatedData.price = parseInt(productData.price);
            updatedData.instagram = productData.instagram;
            updatedData.facebook = productData.facebook;
            updatedData.phoneNumber = productData.phoneNumber;
            });
        Alert.alert(
            "Success",
            "Successfully update your product information!",
            [{
                text: "OK", onPress: () => NavigationContainer.goBack()
            }]
        )
    }

  useEffect(() => {
    const data = realm.objects('Product').filtered(`id = ${productId}`)[0];
    setProductData({
      productName: data.productName,
      imagePath: data.imagePath,
      category: data.category,
      description: data.description,
      price: String(data.price),
      instagram: data.instagram,
      facebook: data.facebook,
      phoneNumber: data.phoneNumber,
    });
  }, [productId]);
//   console.log(data[0].productName)

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scroll}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => addImage()}>
            <Image
              style={{
                width: productData.imagePath !== '' ? wp('50%') : 50,
                height: productData.imagePath !== '' ? wp('50%') : 50,
              }}
              source={{
                uri:
                  productData.imagePath !== ''
                    ? productData.imagePath
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1024px-Antu_insert-image.svg.png?20160706115716',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Product Name"
            value={productData.productName}
            onChangeText={text => onInputChange('productName', text)}
          />
          <SelectDropdown
            data={categoryList}
            defaultButtonText="Select Category"
            defaultValueByIndex={productData.category - 1}
            onSelect={item => {
              onInputChange('category', item.id);
            }}
            buttonTextAfterSelection={item => {
              return item.name;
            }}
            rowTextForSelection={item => {
              return item.name;
            }}
            buttonStyle={styles.selectDropdown}
            buttonTextStyle={styles.selectText}
            // ref={dropdownRef}
          />
        </View>
        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Description"
            value={productData.description}
            onChangeText={text => onInputChange('description', text)}
            isDescription={true}
          />
          <InputComponent
            placeholder="Price"
            value={productData.price}
            onChangeText={text => onInputChange('price', text)}
            isIcon={true}
            name="dollar"
            type="font-awesome"
          />
        </View>
        <Text style={styles.sellerText}>Seller Contact</Text>
        <InputComponent
          placeholder="wa number"
          value={productData.phoneNumber}
          onChangeText={text => onInputChange('phoneNumber', text)}
          isIcon={true}
          name="whatsapp"
          type="font-awesome"
        />
        <InputComponent
          placeholder="instagram"
          value={productData.instagram}
          onChangeText={text => onInputChange('instagram', text)}
          isIcon={true}
          name="instagram"
          type="font-awesome"
        />
        <InputComponent
          placeholder="facebook"
          value={productData.facebook}
          onChangeText={text => onInputChange('facebook', text)}
          isIcon={true}
          name="facebook-square"
          type="font-awesome"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveData()}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}};

export default EditProductScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
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
    width: wp('50%'),
    height: wp('50%'),
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sellerText: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 0,
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'mistyrose',
  },
  saveText: {
    color: 'black',
  },
  selectDropdown: {
    borderRadius: 10,
    backgroundColor: 'skyblue',
    width: wp('40%'),
    height: hp('4%'),
    marginLeft: 8,
  },
  selectText: {
    fontSize: hp('1.5%'),
  },
})
