import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

const App = () => {
  const [word, setWord] = useState('');
  const [previousRequests, setPreviousRequests] = useState([]);
  const [apiData, setApiData] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.genderize.io/?name=${word}`);
      const data = await response.json();

      setApiData(data);
      setWord('');
      console.log('fetchData ', word);

      // Update previousRequests state
      setPreviousRequests(prevRequests => [...prevRequests, data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a word"
        value={word}
        onChangeText={text => setWord(text)}
      />
      <Button title="Fetch Data" onPress={fetchData} />

      <ScrollView style={styles.cardContainer1}>
        {apiData !== undefined ? (
          <View style={styles.card1}>
            <Text>Name: {apiData.name}</Text>
            <Text>Gender: {apiData.gender}</Text>
            <Text>Probability: {apiData.probability}</Text>
          </View>
        ) : null}
      </ScrollView>

      <ScrollView style={styles.cardContainer2}>
        {previousRequests.map((prevWord, index) => (
          <View key={index} style={styles.card2}>
            <Text>{index + 1}</Text>
            <Text>Name: {prevWord.name}</Text>
            <Text>Gender: {prevWord.gender}</Text>
            <Text>Probability: {prevWord.probability}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  cardContainer1: {
    marginTop: 20,
    maxHeight: 100,
  },
  cardContainer2: {
    marginTop: 20,
    maxHeight: 400,
  },
  card1: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    backgroundColor: "green"
  },
  card2: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    backgroundColor: "blue"
  },
});

export default App;