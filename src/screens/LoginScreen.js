import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { useApp } from '../utils/context';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser, setLoading, setError } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text));
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just set a mock user
      setUser({
        id: '1',
        email,
        name: 'Demo User'
      });
      
      setLoading(false);
    } catch (error) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-8">
        <Animated.View 
          entering={FadeInDown.delay(200).duration(1000)}
          className="mb-8"
        >
          <Text className="text-4xl font-bold text-primary mb-2">Welcome Back</Text>
          <Text className="text-gray-600">Sign in to continue shopping</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(1000)}>
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Email</Text>
            <TextInput
              className={`bg-gray-100 px-4 py-3 rounded-lg ${
                !isValidEmail && email ? 'border-2 border-red-500' : ''
              }`}
              placeholder="Enter your email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {!isValidEmail && email && (
              <Text className="text-red-500 text-sm mt-1">
                Please enter a valid email address
              </Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-gray-700 mb-2">Password</Text>
            <TextInput
              className="bg-gray-100 px-4 py-3 rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="bg-primary py-4 rounded-lg items-center mb-4"
            onPress={handleLogin}
          >
            <Text className="text-white font-bold text-lg">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => navigation.navigate('Signup')}
          >
            <Text className="text-gray-600">
              Don't have an account?{' '}
              <Text className="text-primary font-bold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
