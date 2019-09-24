import React, {useEffect, useState} from 'react'
import Geolocation from 'react-native-geolocation-service';
import { View, Text } from 'react-native'

import { AppNav } from '../navigation/Navigator'
import { useStateValue } from '../context/Context'

export default ({navigation}) => {
    const [{loggedIn},dispatch] = useStateValue()
    const [ready, setReady] = useState(false);

    useEffect(() => {
        watch = Geolocation.watchPosition(
            ({coords})=>{
                dispatch({
                    type:"pos",
                    value:coords
                })
                if(!ready)
                    setReady(true);
            },
            (err)=>{
                console.log(err.message)
            }, { enableHighAccuracy: true, maximumAge:1000, distanceFilter: 5, timeout:500, interval:500, fastestInterval:500 }
        )
        return () => Geolocation.clearWatch(watch)
    }, [])

    useEffect(()=>{
        if(!loggedIn){
            navigation.navigate("Auth")
        }
    },[loggedIn])

    return ready ? (
        <AppNav />
    ) : <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><Text>getting location data</Text></View>
}