import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import {images} from '../../constants/images'
import { icons } from '../../constants/icons'




const TabIcon= ({focused, icon, title}: any) => {

    if(focused){
    return(
<>
<ImageBackground  source={images.highlight}
 className=" flex flex-row w-full flex-1 min-w-[115px] min-h-[44px] mt-4
 justify-center items-center rounded-full">

<Image source={icon}
tintColor="#151312"
className="size-5"/>
<Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
</ImageBackground>
</>
    )

}else{ 
    return(
    <View className='size-full justify-center items-center mt-4 rounded-full'>
    <Image source={icon}
    tintColor="#A8B5DB"
    className="size-5"/>

    </View>
    )
}
}
const TabsLayout = () => {
  return (
    <Tabs
    screenOptions={{
        tabBarShowLabel:false,
        tabBarItemStyle:{
            width:"100%",
            height:"100%",
          justifyContent:"center",
          alignItems:"center",
        },

        tabBarStyle:{
            backgroundColor:"#0f0d23",
            borderRadius:25,
        marginHorizontal:17,
        marginBottom:28,
        height:50,
        position:"absolute",
        overflow:"hidden",
        
        borderColor:"#0f0d23",
        }
    }}
    >

<Tabs.Screen name="index" options={{headerShown:false,
    title:"Home",
    tabBarIcon: ({focused}) => (
        <TabIcon focused={focused} icon={icons.home} title="Home"/>
    )
    }} />


<Tabs.Screen name="search" options={{
    headerShown:false,
    title:"Search",
    tabBarIcon: ({focused}) => (
        <TabIcon   focused={focused} icon={icons.search} title="Search"/>
    )
    }} />

<Tabs.Screen name="saved" options={{
    headerShown:false,
    title:"Saved",
    tabBarIcon: ({focused}) => (
        <TabIcon   focused={focused} icon={icons.save} title="Saved"/>
    )
    }} />

<Tabs.Screen name="profile" options={{
    headerShown:false,
    title:"Profile",
    tabBarIcon: ({focused}) => (
        <TabIcon   focused={focused} icon={icons.person} title="Profile"/>
    )
    }} />

    </Tabs>


  )
}

export default TabsLayout
