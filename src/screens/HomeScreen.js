import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeInRight,
} from 'react-native-reanimated';
import { useApp } from '../utils/context';

const { width } = Dimensions.get('window');

// Mock data
const featuredProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'https://picsum.photos/200/200',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://picsum.photos/200/200',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://picsum.photos/200/200',
    category: 'Sports'
  }
];

const categories = [
  { id: '1', name: 'Electronics', icon: '🔌' },
  { id: '2', name: 'Fashion', icon: '👕' },
  { id: '3', name: 'Sports', icon: '⚽' },
  { id: '4', name: 'Home', icon: '🏠' },
  { id: '5', name: 'Beauty', icon: '💄' },
  { id: '6', name: 'Books', icon: '📚' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useApp();

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('ProductList', { category });
  };

  const renderFeaturedProduct = (product, index) => (
    <Animated.View
      key={product.id}
      entering={FadeInRight.delay(index * 200)}
      className="mr-4"
    >
      <TouchableOpacity
        onPress={() => handleProductPress(product)}
        className="bg-white rounded-lg shadow-md overflow-hidden"
        style={{ width: width * 0.6 }}
      >
        <Image
          source={{ uri: product.image }}
          className="w-full h-40"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-800">{product.name}</Text>
          <Text className="text-sm text-gray-500 mb-2">{product.category}</Text>
          <Text className="text-primary font-bold">${product.price}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderCategory = (category, index) => (
    <Animated.View
      key={category.id}
      entering={FadeInDown.delay(index * 100)}
      className="w-1/3 p-2"
    >
      <TouchableOpacity
        onPress={() => handleCategoryPress(category)}
        className="bg-white rounded-lg p-4 items-center shadow-sm"
      >
        <Text className="text-2xl mb-2">{category.icon}</Text>
        <Text className="text-gray-800 font-medium">{category.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-primary p-6">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-lg">Welcome back,</Text>
            <Text className="text-white text-xl font-bold">{user?.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            className="bg-white/20 p-2 rounded-full"
          >
            <Text className="text-2xl">🛒</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Products */}
      <View className="mt-6">
        <View className="px-6 mb-4 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-gray-800">Featured Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductList')}>
            <Text className="text-primary">See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-6"
        >
          {featuredProducts.map((product, index) => renderFeaturedProduct(product, index))}
        </ScrollView>
      </View>

      {/* Categories */}
      <View className="mt-6 px-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">Categories</Text>
        <View className="flex-row flex-wrap">
          {categories.map((category, index) => renderCategory(category, index))}
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={logout}
        className="mx-6 mt-6 mb-8 bg-red-500 py-3 rounded-lg items-center"
      >
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;
