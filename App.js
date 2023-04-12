import React from 'react';
import firebase from "firebase/compat";
import {useEffect, useState} from 'react'
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ClothesList from "./components/pages/ClothesList";
import Add_edit_Clothes from "./components/pages/Add_edit_Clothes";
import ClothesDetails from "./components/pages/ClothesDetails";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from './components/pages/Profile';
import Message from './components/pages/Message';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Map from './components/pages/Map';


export default function App() {

  const [user, setUser] = useState({ loggedIn: false });

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // config for accessing firebase database
  const firebaseConfig = {
    apiKey: "AIzaSyAFZPd_IS2hMcwhwjHBr1ENANA9Z4GXInA",
    authDomain: "fir-db-a0f52.firebaseapp.com",
    projectId: "fir-db-a0f52",
    storageBucket: "fir-db-a0f52.appspot.com",
    messagingSenderId: "564638001504",
    appId: "1:564638001504:web:b96751196fd9ba9b695605",
    measurementId: "G-EQDNHME0ZG"
  };

  // checks the connection to firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }


  // onAuthStateChange burde tjekke om en bruger er logget ind? 
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true, user: user});
      } else {
        callback({loggedIn: false});
      }
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);


  // MyTheme is controlling the colors of the navigation container. 
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'black',
      background: '#e2e1de',
      card: '#d9825f',
      border: 'black',
      notification: 'blue'
    },
  };

  // Navigation: the navigation menu is made, and returns the stacknavigator containing the different screens to be displayed in the menu. 
  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'Clothes List'} component={ClothesList}/>
          <Stack.Screen name={'Clothes Details'} component={ClothesDetails}/>
          <Stack.Screen name={'Edit Clothes'} component={Add_edit_Clothes}/>
          <Stack.Screen name={'Login'} component={Login}/>
          <Stack.Screen name={'Sign Up'} component={SignUp}/>
          <Stack.Screen name={'Min profil'} component={Profile}/>
          <Stack.Screen name={'Map'} component={Map}/>
        </Stack.Navigator>
    ) 
  }
  // App.js returns the navigator, from which you can access the different components/views in the application
  return (
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator>
          <Tab.Screen name={'Lej tøj'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="pricetags-outline" size={20} />),headerShown:null}}/>
          <Tab.Screen name={'Udlej tøj'} component={Add_edit_Clothes} options={{tabBarIcon: () => ( <Ionicons name="pricetag-outline" size={20} />)}}/>
          <Tab.Screen name={'Besked'} component={Message} options={{tabBarIcon: () => ( <Ionicons name="mail-open-outline" size={20} />)}}/>
          <Tab.Screen name={'Min profil'} component={Profile} options={{tabBarIcon: () => ( <Ionicons name="person-outline" size={20} />)}}/>
          <Tab.Screen name={'Login'} component={Login} options={{tabBarIcon: () => ( <Ionicons name="person-outline" size={20} />)}}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}