import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../utils/context';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { user } = useApp();
  
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const navigateToNextScreen = () => {
    const nextScreen = user ? 'Home' : 'Login';
    navigation.replace(nextScreen);
  };

  useEffect(() => {
    // Start animation sequence
    scale.value = withSpring(1, { damping: 10 });
    opacity.value = withTiming(1, { duration: 1000 });

    // Navigate after animation
    const timer = setTimeout(() => {
      runOnJS(navigateToNextScreen)();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Animated.View style={logoStyle} className="items-center">
        <Text className="text-white text-5xl font-bold mb-4">
          E-Commerce
        </Text>
        <Text className="text-white text-lg">
          Shop with style
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
