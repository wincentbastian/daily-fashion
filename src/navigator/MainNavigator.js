import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import AddProductScreen from '../screens/AddProductScreen'
import ShowProductScreen from '../screens/ShowProductScreen'
import EditProductScreen from "../screens/EditProductScreen";
import DetailTrainingScreen from "../screens/DetailTrainingScreen"
import TrainingScreen from '../screens/TrainingScreen'


const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()


const DrawerNav = () => {
    return (
        <Drawer.Navigator initialRouteName='ShowProduct'>
            <Drawer.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    title: 'Daily Fashion',
                    headerStyle: {
                        backgroundColor: '#D1E5C2'
                    },
                    headerTitleAlign: 'center',
                    drawerIcon: config =>
                        <Icon
                            name='home'
                            type='antdesign'
                        />
                }}
            />
            <Stack.Screen
                name="ShowProduct"
                component={ShowProductScreen}
                options={{
                    title: 'Product',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#D1E5C2'
                    },
                }}
            />
        </Drawer.Navigator>
    )
}

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='ShowProduct'>
                <Stack.Screen
                    name='Drawer'
                    component={DrawerNav}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='AddProduct'
                    component={AddProductScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='ShowProduct'
                    component={ShowProductScreen}
                    options={{
                        title: 'FreeTraining',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#D1E5C2'
                        },
                    }}
                />
                <Stack.Screen
                    name='DetailTraining'
                    component={DetailTrainingScreen}
                    options={{
                        title: 'Detail',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#D1E5C2'
                        },
                    }}
                />
                <Stack.Screen
                    name='Training'
                    component={TrainingScreen}
                    options={{
                        title: 'Detail',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#D1E5C2'
                        },
                    }}
                />
                <Stack.Screen
                    name="EditProduct"
                    component={EditProductScreen}
                    options={{
                        title: 'AddTraining',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#D1E5C2'
                        },
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator