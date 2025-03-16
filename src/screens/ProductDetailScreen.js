import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useApp } from '../utils/context';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Mock multiple product images
  const productImages = [
    product.image,
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
  ];

  // Animation values
  const scale = useSharedValue(1);
  
  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleAddToCart = () => {
    // Animate button press
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });

    addToCart(product);
    Alert.alert(
      'Success',
      'Product added to cart!',
      [
        {
          text: 'Continue Shopping',
          style: 'cancel',
        },
        {
          text: 'Go to Cart',
          onPress: () => navigation.navigate('Cart'),
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Image Gallery */}
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setSelectedImageIndex(newIndex);
          }}
        >
          {productImages.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={{ width, height: width }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        
        {/* Image Indicators */}
        <View className="flex-row justify-center absolute bottom-4 w-full">
          {productImages.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                selectedImageIndex === index ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </View>
      </View>

      {/* Product Details */}
      <Animated.View 
        entering={FadeInDown.delay(200)}
        className="p-6"
      >
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {product.name}
        </Text>
        
        <Text className="text-primary text-xl font-bold mb-4">
          ${product.price}
        </Text>

        <Text className="text-gray-600 mb-6">
          {product.description}
        </Text>

        {/* Specifications */}
        <View className="bg-gray-50 p-4 rounded-lg mb-6">
          <Text className="font-bold text-gray-800 mb-3">Specifications</Text>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Category</Text>
              <Text className="text-gray-800">{product.category}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Availability</Text>
              <Text className="text-green-600">In Stock</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Shipping</Text>
              <Text className="text-gray-800">Free</Text>
            </View>
          </View>
        </View>

        {/* Add to Cart Button */}
        <Animated.View style={buttonStyle}>
          <TouchableOpacity
            onPress={handleAddToCart}
            className="bg-primary py-4 rounded-lg items-center"
          >
            <Text className="text-white font-bold text-lg">Add to Cart</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
