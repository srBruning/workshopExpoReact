import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


export default function App(){
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  function handleSubmit(){
    if(peso > 0 && altura > 0){	
      var imc = (peso/(altura/100*altura/100)).toFixed(2) ;
      if(imc < 18.5)
        alert("IMC: "+imc+"\nVoce esta abaixo do peso ideal");
      else if(imc > 18.5 && imc < 25)
        alert("IMC: "+imc+"\nVocê tem um peso saldável.");
      else if(imc > 25)
        alert("IMC: "+imc+"\nVocê tem excesso de peso.");
    }else{
        alert("Preencha tudo corretamente");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calcule seu IMC</Text>

      <TextInput style={styles.input}
        value={altura}
        onChangeText={ (altura)=> setAltura(altura)}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        placeholderTextColor="#000"
      />

      <TextInput style={styles.input}
        value={peso}
        onChangeText={ (peso)=> setPeso(peso)}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        placeholderTextColor="#000"
      />

      <TouchableOpacity style={styles.button}
          onPress={handleSubmit}>
        <Text style={styles.buttonText} >Calcular</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 25,
    color: '#000'
  }, 
  input:{
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    margin: 15,
    padding:10,
    color: '#121212', 
    fontSize: 22,
  },
  button:{
    justifyContent: "center", 
    alignItems: "center", 
    margin: 15, 
    backgroundColor: "#41AEF4",
    padding: 10,
  },
  buttonText:{
    color: "#fff",
    fontSize: 25,
  }
})