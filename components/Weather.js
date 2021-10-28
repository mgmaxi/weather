import React, {useState, useEffect} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';

const Weather = ({cityHour, resultDataAPI}) => {
  const {name, main, weather} = resultDataAPI;

  if (!name) return null;

  // Animation Icon
  const [animationIcon] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationIcon, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animationIcon, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const rotationIcon = animationIcon.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const iconAnimationStyle = {
    transform: [{rotate: rotationIcon}],
  };

  // Degrees Kelvin
  const kelvin = 273.15;

  return (
    <View style={styles.weather}>
      <Text style={[styles.text, styles.city]}>{name}</Text>
      <Text style={styles.text}> {weather[0].main} </Text>
      <Text style={styles.text}>{cityHour}</Text>
      <View style={styles.containerCurrentTemp}>
        <Text style={[styles.text, styles.currentTemp]}>
          {parseInt(main.temp - kelvin)}
        </Text>
        <Text style={[styles.temperature, {paddingTop: 20, color: '#FFF'}]}>
          &#x2103;
        </Text>
        <Animated.Image
          style={[{marginTop: 10, height: 63, width: 71}, iconAnimationStyle]}
          source={{
            uri: `http://openweathermap.org/img/w/${weather[0].icon}.png`,
          }}
        />
      </View>

      <View style={styles.temperatures}>
        <Text style={styles.text}>
          Min{' '}
          <Text style={styles.temperature}>
            {parseInt(main.temp_min - kelvin)}
            &#x2103;
          </Text>
        </Text>
        <Text style={styles.text}>
          Max{' '}
          <Text style={styles.temperature}>
            {parseInt(main.temp_max - kelvin)}
            &#x2103;
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weather: {marginBottom: 20},
  city: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  containerCurrentTemp: {flexDirection: 'row', justifyContent: 'center'},
  currentTemp: {
    marginRight: 0,
    fontSize: 80,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 6,
  },
  text: {marginRight: 20, color: '#FFF', fontSize: 20, textAlign: 'center'},
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  temperatures: {flexDirection: 'row', justifyContent: 'center'},
});

export default Weather;
