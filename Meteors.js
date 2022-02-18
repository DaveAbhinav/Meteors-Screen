import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            meteors: {},
        }
    }
    
    componentDidMount(){
        this.getMeteros();
    }

    getMeteros = ()=>{
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=J92Lg67WF4ihuwyfNXZ6eXRBtMth4fvEiHhcfTBI")
        .then(response=>{
            this.setState({
                meteors: response.data.near_earth_objects
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })

    }
    render() {
        if(Object.keys(this.state.meteors).length===0){
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading...</Text>
                </View>
            )
        }else{
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date=>{
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([],meteor_arr);
            meteors.forEach(function(element){
                let daimeter = (element.estimated_daimeter.kilometers.estimated_daimeter_min + element.estimated_daimeter.kilometers.estimated_daimeter_max)/2
                let threatScore = (daimeter/element.close_apporach_data[0].miss_distance.kilometers)*1000000000
                element.threat_score=threatScore;
            })
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Meteor Screen!</Text>
            </View>
            )
        }
    }
}