import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';
import { useApp } from '../utils/context';

const STEPS = {
  SHIPPING: 'shipping',
  PAYMENT: 'payment',
  REVIEW: 'review',
};

const CheckoutScreen = ({ navigation }) => {
  const { cart, clearCart } = useApp();
  const [currentStep, setCurrentStep] = useState(STEPS.SHIPPING);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 10;
    const tax = subtotal * 0.1;
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
    };
  };

  const validateShippingInfo = () => {
    const { fullName, address, city, zipCode, phone } = shippingInfo;
    if (!fullName || !address || !city || !zipCode || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    return true;
  };

  const validatePaymentInfo = () => {
    const { cardNumber, expiryDate, cvv, cardholderName } = paymentInfo;
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === STEPS.SHIPPING && validateShippingInfo()) {
      setCurrentStep(STEPS.PAYMENT);
    } else if (currentStep === STEPS.PAYMENT && validatePaymentInfo()) {
      setCurrentStep(STEPS.REVIEW);
    }
  };

  const handleBack = () => {
    if (currentStep === STEPS.PAYMENT) {
      setCurrentStep(STEPS.SHIPPING);
    } else if (currentStep === STEPS.REVIEW) {
      setCurrentStep(STEPS.PAYMENT);
    }
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      'Confirm Order',
      'Are you sure you want to place this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Place Order',
          onPress: () => {
            // Simulate order placement
            clearCart();
            Alert.alert(
              'Success',
              'Your order has been placed successfully!',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Home'),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const renderProgressBar = () => (
    <View className="flex-row justify-between mb-6 px-4">
      {Object.values(STEPS).map((step, index) => (
        <View key={step} className="flex-1 flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              Object.values(STEPS).indexOf(currentStep) >= index
                ? 'bg-primary'
                : 'bg-gray-300'
            }`}
          >
            <Text className="text-white font-bold">{index + 1}</Text>
          </View>
          {index < Object.values(STEPS).length - 1 && (
            <View
              className={`flex-1 h-1 mx-2 ${
                Object.values(STEPS).indexOf(currentStep) > index
                  ? 'bg-primary'
                  : 'bg-gray-300'
              }`}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderShippingForm = () => (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      className="px-4"
    >
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Shipping Information
      </Text>
      <View className="space-y-4">
        <View>
          <Text className="text-gray-600 mb-1">Full Name</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            value={shippingInfo.fullName}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, fullName: text })}
          />
        </View>
        <View>
          <Text className="text-gray-600 mb-1">Address</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            value={shippingInfo.address}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, address: text })}
          />
        </View>
        <View>
          <Text className="text-gray-600 mb-1">City</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            value={shippingInfo.city}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, city: text })}
          />
        </View>
        <View>
          <Text className="text-gray-600 mb-1">ZIP Code</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            value={shippingInfo.zipCode}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, zipCode: text })}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text className="text-gray-600 mb-1">Phone</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            value={shippingInfo.phone}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, phone: text })}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </Animated.View>
  );

  const renderPaymentForm = () => (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      className="px-4"
    >
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Payment Information
      </Text>
      <View className="space-y-4">
        <View>
          <Text className="text-gray-600 mb-1">Card Number</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            value={paymentInfo.cardNumber}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cardNumber: text })}
            keyboardType="numeric"
            maxLength={16}
          />
        </View>
        <View className="flex-row space-x-4">
          <View className="flex-1">
            <Text className="text-gray-600 mb-1">Expiry Date</Text>
            <TextInput
              className="bg-gray-100 px-4 py-3 rounded-lg"
              value={paymentInfo.expiryDate}
              onChangeText={(text) => setPaymentInfo({ ...paymentInfo, expiryDate: text })}
              placeholder="MM/YY"
              maxLength={5}
            />
          </View>
          <View className="flex-1">
            <Text className="text-gray-600 mb-1">CVV</Text>
            <TextInput
              className="bg-gray-100 px-4 py-3 rounded-lg"
              value={paymentInfo.cvv}
              onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cvv: text })}
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>
        <View>
          <Text className="text-gray-600 mb-1">Cardholder Name</Text>
          <TextInput
            className="bg-gray-100 px-4 py-3 rounded-lg"
            value={paymentInfo.cardholderName}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cardholderName: text })}
          />
        </View>
      </View>
    </Animated.View>
  );

  const renderOrderReview = () => {
    const { subtotal, shipping, tax, total } = calculateTotal();
    return (
      <Animated.View
        entering={SlideInRight}
        exiting={SlideOutLeft}
        className="px-4"
      >
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Order Review
        </Text>
        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="font-bold mb-2">Shipping Address</Text>
          <Text className="text-gray-600">{shippingInfo.fullName}</Text>
          <Text className="text-gray-600">{shippingInfo.address}</Text>
          <Text className="text-gray-600">
            {shippingInfo.city}, {shippingInfo.zipCode}
          </Text>
          <Text className="text-gray-600">{shippingInfo.phone}</Text>
        </View>
        <View className="bg-white rounded-lg p-4 mb-4">
          <Text className="font-bold mb-2">Order Summary</Text>
          {cart.map((item) => (
            <View key={item.id} className="flex-row justify-between mb-2">
              <Text className="text-gray-600">
                {item.name} x {item.quantity}
              </Text>
              <Text className="text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View className="border-t border-gray-200 mt-2 pt-2">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Subtotal</Text>
              <Text className="text-gray-800">${subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-600">Shipping</Text>
              <Text className="text-gray-800">${shipping.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Tax</Text>
              <Text className="text-gray-800">${tax.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-bold">Total</Text>
              <Text className="font-bold text-primary">${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="py-6">
          {renderProgressBar()}
          {currentStep === STEPS.SHIPPING && renderShippingForm()}
          {currentStep === STEPS.PAYMENT && renderPaymentForm()}
          {currentStep === STEPS.REVIEW && renderOrderReview()}
        </View>
      </ScrollView>
      
      <View className="p-4 bg-white shadow-lg">
        <View className="flex-row space-x-4">
          {currentStep !== STEPS.SHIPPING && (
            <TouchableOpacity
              onPress={handleBack}
              className="flex-1 border border-primary py-3 rounded-lg items-center"
            >
              <Text className="text-primary font-medium">Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={currentStep === STEPS.REVIEW ? handlePlaceOrder : handleNext}
            className="flex-1 bg-primary py-3 rounded-lg items-center"
          >
            <Text className="text-white font-medium">
              {currentStep === STEPS.REVIEW ? 'Place Order' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckoutScreen;
