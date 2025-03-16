import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { useApp } from '../utils/context';

const SignupScreen = () => {
  const navigation = useNavigation();
  const { setUser, setLoading, setError } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validations, setValidations] = useState({
    isValidEmail: true,
    isValidPassword: true,
    passwordsMatch: true
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'email') {
      setValidations(prev => ({
        ...prev,
        isValidEmail: validateEmail(value)
      }));
    }

    if (field === 'password') {
      setValidations(prev => ({
        ...prev,
        isValidPassword: validatePassword(value),
        passwordsMatch: value === formData.confirmPassword
      }));
    }

    if (field === 'confirmPassword') {
      setValidations(prev => ({
        ...prev,
        passwordsMatch: value === formData.password
      }));
    }
  };

  const handleSignup = async () => {
    // Validate all fields are filled
    if (Object.values(formData).some(value => !value)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate email and password
    if (!validations.isValidEmail) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (!validations.isValidPassword) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    if (!validations.passwordsMatch) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just set a mock user
      setUser({
        id: '1',
        email: formData.email,
        name: formData.name
      });
      
      setLoading(false);
    } catch (error) {
      setError('Signup failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1">
        <View className="flex-1 justify-center px-8 py-12">
          <Animated.View 
            entering={FadeInDown.delay(200).duration(1000)}
            className="mb-8"
          >
            <Text className="text-4xl font-bold text-primary mb-2">Create Account</Text>
            <Text className="text-gray-600">Sign up to start shopping</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(1000)}>
            <View className="mb-4">
              <Text className="text-gray-700 mb-2">Full Name</Text>
              <TextInput
                className="bg-gray-100 px-4 py-3 rounded-lg"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2">Email</Text>
              <TextInput
                className={`bg-gray-100 px-4 py-3 rounded-lg ${
                  !validations.isValidEmail && formData.email ? 'border-2 border-red-500' : ''
                }`}
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {!validations.isValidEmail && formData.email && (
                <Text className="text-red-500 text-sm mt-1">
                  Please enter a valid email address
                </Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2">Password</Text>
              <TextInput
                className={`bg-gray-100 px-4 py-3 rounded-lg ${
                  !validations.isValidPassword && formData.password ? 'border-2 border-red-500' : ''
                }`}
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry
              />
              {!validations.isValidPassword && formData.password && (
                <Text className="text-red-500 text-sm mt-1">
                  Password must be at least 8 characters long
                </Text>
              )}
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 mb-2">Confirm Password</Text>
              <TextInput
                className={`bg-gray-100 px-4 py-3 rounded-lg ${
                  !validations.passwordsMatch && formData.confirmPassword ? 'border-2 border-red-500' : ''
                }`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange('confirmPassword', text)}
                secureTextEntry
              />
              {!validations.passwordsMatch && formData.confirmPassword && (
                <Text className="text-red-500 text-sm mt-1">
                  Passwords do not match
                </Text>
              )}
            </View>

            <TouchableOpacity
              className="bg-primary py-4 rounded-lg items-center mb-4"
              onPress={handleSignup}
            >
              <Text className="text-white font-bold text-lg">Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center"
              onPress={() => navigation.navigate('Login')}
            >
              <Text className="text-gray-600">
                Already have an account?{' '}
                <Text className="text-primary font-bold">Sign In</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
