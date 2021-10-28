import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Keyboard,
  Animated,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import Form from './components/Form';
import Weather from './components/Weather';

const App = () => {
  const [search, setSearch] = useState({city: '', country: ''});
  const [fetchDataAPI, setFetchDataAPI] = useState(false);
  const [resultDataAPI, setResultDataAPI] = useState({});
  const [bgColor, setBgColor] = useState('rgb(71,149,212)');
  const [bgImage, setBgImage] = useState('https://i.ibb.co/m9xBcg6/day.webp');
  const [cityHour, setCityHour] = useState('');
  const [fadeInAnimation] = useState(new Animated.Value(0));

  const {city, country} = search;

  // Fetch data from API
  useEffect(() => {
    const fetchDataWeather = async () => {
      if (fetchDataAPI) {
        const appId = '0d9da02887282a8ad378efd51d21994c';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
        try {
          const response = await fetch(url);
          const result = await response.json();
          setResultDataAPI(result);
          setFetchDataAPI(false);

          // fn for get the current time of a city
          const getCityHour = format => {
            const {timezone} = result;
            const currentCityHour = moment()
              .utcOffset(timezone / 60)
              .format(format);
            return currentCityHour;
          };
          setCityHour(getCityHour('h:mm A'));

          // According to the hour change the bgImage
          let currentCityHour = getCityHour('HH');
          if (currentCityHour <= 8 || currentCityHour >= 20) {
            setBgImage('https://i.ibb.co/6HXFHP0/night.webp');
          } else {
            setBgImage('https://i.ibb.co/m9xBcg6/day.webp');
          }

          // fn change bgColor according to the weather
          const kelvin = 273.15;
          const {main} = result;
          const currentTemp = main.temp - kelvin;

          if (currentTemp < 10) {
            setBgColor('rgb(105,108,149)');
          } else if (currentTemp >= 10 && currentTemp < 25) {
            setBgColor('rgb(71,149,212)');
          } else {
            setBgColor('rgb(178,28,61)');
          }
        } catch (error) {
          showAlert();
        }
      }
    };
    fetchDataWeather();
  }, [fetchDataAPI]);

  // Alert
  const showAlert = () => {
    Alert.alert('Error', 'Try with another city and country', [{text: 'OK'}]);
  };

  //fn hideKeyboard
  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  // Variable bgColor
  const bgColorApp = {
    backgroundColor: bgColor,
  };

  // Variable for bg image
  const bgImageApp = {uri: bgImage};

  // FadeIn Animation
  useEffect(() => {
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <View style={[styles.app, bgColorApp]}>
          <ImageBackground
            source={bgImageApp}
            resizeMode="cover"
            style={styles.bgImage}>
            <View style={styles.container}>
              <Animated.View style={{opacity: fadeInAnimation}}>
                {Object.keys(resultDataAPI).length === 0 ? (
                  <Text style={styles.titleWeather}>Weather</Text>
                ) : (
                  <Weather cityHour={cityHour} resultDataAPI={resultDataAPI} />
                )}
                <Form
                  search={search}
                  setSearch={setSearch}
                  setFetchDataAPI={setFetchDataAPI}
                />
              </Animated.View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    marginHorizontal: '2.5%',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  titleWeather: {
    marginBottom: 20,
    color: '#FFF',
    fontSize: 70,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
  },
});

export default App;
