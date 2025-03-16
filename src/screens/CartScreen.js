import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useApp } from '../utils/context';

const SWIPE_THRESHOLD = -100;

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(70);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-1000);
        itemHeight.value = withTiming(0);
        opacity.value = withTiming(0, {}, () => {
          runOnJS(onRemove)(item.id);
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    opacity: opacity.value,
    marginBottom: withSpring(itemHeight.value === 0 ? 0 : 16),
  }));

  return (
    <Animated.View style={rContainerStyle}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View
          style={rStyle}
          className="bg-white rounded-lg shadow-sm p-4 flex-row items-center"
        >
          <Image
            source={{ uri: item.image }}
            className="w-16 h-16 rounded-lg"
            resizeMode="cover"
          />
          <View className="flex-1 ml-4">
            <Text className="text-gray-800 font-medium" numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="text-primary font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
              className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center"
            >
              <Text className="text-lg">-</Text>
            </TouchableOpacity>
            <Text className="mx-3 font-medium">{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center"
            >
              <Text className="text-lg">+</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const CartScreen = ({ navigation }) => {
  const { cart, removeFromCart, updateCartItem, clearCart } = useApp();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }
    navigation.navigate('Checkout');
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        {cart.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-xl text-gray-500 mb-4">Your cart is empty</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              className="bg-primary px-6 py-3 rounded-full"
            >
              <Text className="text-white font-medium">Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Shopping Cart ({cart.length} items)
            </Text>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateCartItem}
              />
            ))}
          </>
        )}
      </ScrollView>

      {cart.length > 0 && (
        <View className="p-4 bg-white shadow-lg">
          <View className="flex-row justify-between mb-4">
            <Text className="text-gray-600">Total</Text>
            <Text className="text-xl font-bold text-primary">
              ${calculateTotal().toFixed(2)}
            </Text>
          </View>
          <View className="flex-row space-x-4">
            <TouchableOpacity
              onPress={clearCart}
              className="flex-1 bg-red-500 py-3 rounded-lg items-center"
            >
              <Text className="text-white font-medium">Clear Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCheckout}
              className="flex-1 bg-primary py-3 rounded-lg items-center"
            >
              <Text className="text-white font-medium">Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
