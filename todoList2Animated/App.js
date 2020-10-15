
import React, {useState, useCallback, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView , StatusBar, TouchableOpacity, 
  FlatList, Modal, TextInputComponent, TextInput, AsyncStorage}  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable'

// creat a child component  of TouchableOpacity with animated properies
const AnimatableBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([]);
  // controls the status of the modal
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  // load tasks from storage, at startup
  useEffect(()=>{
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');
      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);

  // save tasks on storege when updated
  useEffect(()=>{
    async function saveTask() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTask();
  }, [task]);
  
  // funtcion to create a new task
  function handleAdd(taskText) {
    if(taskText === '') return;
    
    const data = {
      key: taskText, task: taskText, check: false
    };
    setTask([...task, data]);
    setOpen(false);
    setInput('');
    
  }

  const handleDelete =  useCallback((data)=>{
    // remove from list
    const find = task.filter( r => r.key != data.key);
    setTask(find);
  });

  const handleCheck = useCallback((data)=>{
    // remove from list
    const find = task.filter( r => r.key != data.key);
    // set as checked 
    data.check = !data.check;
    if(data.check)
      // and add at the end
      setTask([...find, data])
    else
      // and add at the start
      setTask([data, ...find])
    
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171d31"/>
      
      <View style={styles.content}>
        <Text  style={styles.title}>Minhas Tarefaz</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item)=> String(item.key)}
        renderItem={({item})=> <TaskList data={item} 
                                  handleDelete={handleDelete} 
                                  handleCheck={handleCheck} 
                                  handLeft={handleCheck}/>}
                                  
        ItemSeparatorComponent={()=> <Separator/>}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={ ( ) => setOpen(false) }>
              <Ionicons style={{marginLeft:10, marginRight:5}} name="md-arrow-back" 
                size={40} color="#0ff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nova tarefa</Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput  multiline={true}
            placeholderTextColor="#747474"
            autoCorrect={false}
            placeholder="O que precisa fazer hoje?"
            style={styles.input}
            value={input} onChangeText={ (text) => setInput(text) }/>

            <TouchableOpacity style={styles.handleAdd} onPress={()=>handleAdd(input)}>
              <Text style={styles.handleAddText} > Cadastrar</Text>
            </TouchableOpacity>

          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <AnimatableBtn 
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1800}
        onPress={ ( ) => setOpen(true) }>
        <Ionicons name="ios-add" size={35} color="#FFF"/>
      </AnimatableBtn>

    </SafeAreaView>
  );
}

const Separator = () => <View style={{flex:1, height:1, backgroundColor: '#DDD'}}></View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
  },
  title:{
    marginTop: 10,
    padding: 10 , 
    fontSize: 25,
    textAlign: "center",
    color: "#000050",
  } , 
  fab:{
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#0094FF",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset:{
      width:1,
      height: 3
    }
  },
  modal:{
    flex: 1,
    backgroundColor: '#171d31',
  }, 
  modalHeader:{
    marginLeft:10,
    marginRight:10,
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle:{
    fontSize: 23,
    color: "#fff",
    marginLeft: 15,

  },
  modalBody:{
    marginTop: 15
  },
  input:{
    fontSize: 15,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 30, 
    backgroundColor: "#fff",
    padding: 9,
    height: 100,
    textAlignVertical: "top", 
    color: "#000", 
    borderRadius: 5,

  },
  handleAdd:{
    backgroundColor: "#FFF", 
    marginTop: 50, 
    alignItems: "center", 
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
    height: 40,
    borderRadius: 5,
    
  },
  handleAddText:{
    color: "#000",
    fontSize: 20,
  }
});
