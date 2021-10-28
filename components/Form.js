import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  Animated,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Form = ({search, setSearch, setFetchDataAPI}) => {
  const [btnAnimation] = useState(new Animated.Value(1));
  const {city, country} = search;

  const searchWeather = () => {
    // Validation
    if (city.trim() === '' || country.trim() === '') {
      showAlert();
      return;
    }
    // Pass validation then can FetchDataAPI
    setFetchDataAPI(true);
  };

  const showAlert = () => {
    Alert.alert('Error', 'Add a City and a Country', [{text: 'OK'}]);
  };

  // Animation for Search Weather button
  const btnAnimationIn = () => {
    Animated.spring(btnAnimation, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const btnAnimationOut = () => {
    Animated.spring(btnAnimation, {
      toValue: 1,
      friction: 5,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  const btnAnimationStyle = {
    transform: [{scale: btnAnimation}],
  };

  return (
    <View>
      <View>
        <TextInput
          value={city}
          onChangeText={city => setSearch({...search, city})}
          style={styles.inputCity}
          placeholder="City"
          placeholderTextColor="#9b9b9b"
        />
      </View>
      <View>
        <Picker
          selectedValue={country}
          onValueChange={country => setSearch({...search, country})}
          style={styles.picker}
          itemStyle={{
            height: 120,
            backgroundColor: 'white',
          }}>
          <Picker.Item label="- Select a Country -" value="" />
          <Picker.Item label="United States" value="US" />
          <Picker.Item label="Argentina" value="AR" />
          <Picker.Item label="México" value="MX" />
          <Picker.Item label="Colombia" value="CO" />
          <Picker.Item label="Costa Rica" value="CR" />
          <Picker.Item label="España" value="ES" />
          <Picker.Item label="Perú" value="PE" />
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPress={() => searchWeather()}
        onPressIn={() => btnAnimationIn()}
        onPressOut={() => btnAnimationOut()}>
        <Animated.View style={[styles.btnSearch, btnAnimationStyle]}>
          <Text style={styles.textSearch}>Search Weather</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  inputCity: {
    height: 50,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF',
    fontSize: 20,
    textAlign: 'center',
  },
  btnSearch: {
    justifyContent: 'center',
    height: 50,
    padding: 10,
    marginTop: 50,
    backgroundColor: '#000',
  },
  textSearch: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: '#FFF',
  },
});

export default Form;
