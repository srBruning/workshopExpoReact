/*
* Renders task list item
*/
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import Swipeable from 'react-native-gesture-handler/Swipeable';


export default function TaskList({data, handleCheck, handleDelete, handLeft}) {
    function LeftAction(progress, dragX) {
    
      const scale = dragX.interpolate({
        inputRange: [0,100],
        outputRange: [0,1],
        extrapolate: 'clamp'
      })
    
      return (
        <View style={styles.leftAction}>
          <Animatable.Text 
          style={[styles.actionText, {transform: [{scale}] } ]}>
            {data.check? "Restatura":"Concluir"}
          </Animatable.Text>
        </View>
      )
    }

    function RigthAction(progress, dragX) {
      return (
        <View style={styles.rightAction}>
          <TouchableOpacity onPress={ () => handleDelete(data) } style={styles.actionText}>
                <MaterialCommunityIcons style={styles.iconTrash} name="trash-can-outline" size={30} color="black" />
            </TouchableOpacity>
        </View>
      );
    }

    let self;
    return (
      <Swipeable
      ref={ref => self = ref}
        renderLeftActions={LeftAction}
        renderRightActions={RigthAction}
        onSwipeableLeftOpen={() => { self.close(); handLeft(data)} }
      >

        <Animatable.View 
        style={styles.container}
        animation="bounceIn"
        useNativeDriver >
            <View style={styles.navBar}>
                <Text style={[styles.task, data.check?styles.taskConcluida:{}]}>{data.task}</Text>
            </View>

        </Animatable.View>
      </Swipeable>
    );
}

const styles = StyleSheet.create({
    leftAction:{
      flex: 1,
      backgroundColor: "#388e3c",
      justifyContent: "center",
    },
    rightAction:{
      backgroundColor: "#F00",
      justifyContent: "center",
      padding: 20,
    },
    actionText:{
      color: "#FFF",
      fontSize: 22,
      padding: 20,
    },
    container: {
      flex: 1, 
      flexDirection: "row",
      alignItems: 'center',
      backgroundColor: "#fff",
      padding: 12,
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
    taskConcluida: {
      textDecorationLine: 'line-through',
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