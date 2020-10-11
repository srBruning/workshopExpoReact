/*
* Renders task list item
*/
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

export default function TaskList({data, handleCheck, handleDelete}) {
    return (
        <Animatable.View 
        style={styles.container}
        animation="bounceIn"
        useNativeDriver >
            <TouchableOpacity onPress={ () => handleCheck(data) } style={styles.leftContainer}>
                <MaterialCommunityIcons name={ (data.check)?"checkbox-marked-outline" : "checkbox-blank-outline"}
                 size={30} color="#121212" />
            </TouchableOpacity>
            <View style={styles.navBar}>
                <Text style={styles.task}>{data.task}</Text>
            </View>

            <TouchableOpacity onPress={ () => handleDelete(data) } style={styles.rightContainer}>
                <MaterialCommunityIcons style={styles.iconTrash} name="trash-can-outline" size={30} color="black" />
            </TouchableOpacity>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, margin: 8, 
      flexDirection: "row",
      alignItems: 'center',
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 7,
      elevation: 1.5,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset:{ width:1, height: 3          
      }
    },
    navBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
    task:{
        color: "#121212",
        fontSize:20,
        paddingLeft: 10, 
        paddingRight: 20
    },
    leftContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    rightContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    rightIcon: {
      height: 10,
      width: 10,
      resizeMode: 'contain',
      backgroundColor: 'white',
    }
  });