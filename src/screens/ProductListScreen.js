import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
} from 'react-native-reanimated';
import { useApp } from '../utils/context';

const { width } = Dimensions.get('window');
const COLUMN_GAP = 16;
const NUM_COLUMNS = 2;
const ITEM_WIDTH = (width - (COLUMN_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

// Mock data
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'https://picsum.photos/200/200',
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation.'
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://picsum.photos/200/200',
    category: 'Electronics',
    description: 'Feature-rich smartwatch with health tracking.'
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://picsum.photos/200/200',
    category: 'Sports',
    description: 'Comfortable running shoes for all terrains.'
  },
  {
    id: '4',
    name: 'Laptop Bag',
    price: 49.99,
    image: 'https://picsum.photos/200/200',
    category: 'Fashion',
    description: 'Stylish and spacious laptop bag.'
  },
  {
    id: '5',
    name: 'Coffee Maker',
    price: 79.99,
    image: 'https://picsum.photos/200/200',
    category: 'Home',
    description: 'Automatic coffee maker for perfect brews.'
  },
  {
    id: '6',
    name: 'Yoga Mat',
    price: 29.99,
    image: 'https://picsum.photos/200/200',
    category: 'Sports',
    description: 'Non-slip yoga mat for comfortable workouts.'
  },
];

const ProductListScreen = ({ navigation, route }) => {
  const category = route.params?.category;
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useApp();

  const filteredProducts = products.filter(product => {
    const matchesCategory = !category || product.category === category.name;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderProduct = useCallback(({ item, index }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={{ width: ITEM_WIDTH }}
      className="mb-4"
    >
      <TouchableOpacity
        onPress={() => handleProductPress(item)}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <Image
          source={{ uri: item.image }}
          className="w-full h-40"
          resizeMode="cover"
        />
        <View className="p-3">
          <Text className="text-gray-800 font-medium mb-1" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-gray-500 text-sm mb-2" numberOfLines={2}>
            {item.description}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-primary font-bold">${item.price}</Text>
            <TouchableOpacity
              onPress={() => addToCart(item)}
              className="bg-primary px-3 py-1 rounded-full"
            >
              <Text className="text-white">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  ), []);

  return (
    <View className="flex-1 bg-background">
      {/* Search Bar */}
      <View className="p-4 bg-white shadow-sm">
        <TextInput
          className="bg-gray-100 px-4 py-2 rounded-full"
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={{ padding: COLUMN_GAP }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-8">
            <Text className="text-gray-500 text-center">
              No products found. Try adjusting your search.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default ProductListScreen;
