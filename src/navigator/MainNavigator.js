import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import ShowProductScreen from '../screens/ShowProductScreen'
import HomeScreen from '../screens/HomeScreen'
import AddProductScreen from '../screens/AddProductScreen'
import ImageZoomScreen from '../screens/ImageZoomScreen'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()


const DrawerNav = () => {
    return (
        <Drawer.Navigator initialRouteName='Home'>
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
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='ImageZoom'
                    component={ImageZoomScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator