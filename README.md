# React Native E-Commerce App

A modern e-commerce mobile application built with React Native, featuring a clean UI with Tailwind CSS, smooth animations with React Native Reanimated, and comprehensive state management.

## Features

- 🎨 Modern UI with Tailwind CSS
- ✨ Smooth animations and transitions
- 🔐 User authentication flow
- 🛍️ Product browsing and search
- 🛒 Shopping cart with swipe-to-delete
- 💳 Multi-step checkout process
- 📱 Responsive design
- 🌓 Theme support (light/dark)

## Tech Stack

- React Native
- Tailwind CSS (via NativeWind)
- React Navigation
- React Native Reanimated
- React Native Gesture Handler
- AsyncStorage for local storage

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- React Native development environment setup
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rashmithaRKL/reactnative-app01.git
cd reactnative-app01
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. If you encounter any build issues, try these steps:

   a. Clean the build:
   ```bash
   # For Android
   cd android && ./gradlew clean && cd ..
   
   # For iOS
   cd ios && pod deintegrate && pod install && cd ..
   ```

   b. Reset Metro bundler cache:
   ```bash
   npm start -- --reset-cache
   ```

   c. Rebuild the project:
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   ```

### Running the App

1. Start the development server:
```bash
npm start
```

2. Run on Android:
```bash
npm run android
```

3. Run on iOS:
```bash
npm run ios
```

## Project Structure

```
src/
├── navigation/     # Navigation configuration
│   └── AppNavigator.js
├── screens/        # Screen components
│   ├── SplashScreen.js
│   ├── LoginScreen.js
│   ├── SignupScreen.js
│   ├── HomeScreen.js
│   ├── ProductListScreen.js
│   ├── ProductDetailScreen.js
│   ├── CartScreen.js
│   └── CheckoutScreen.js
└── utils/         # Utilities and context
    └── context.js
```

## Troubleshooting Common Issues

1. **Build Failures**
   - Clean the project and rebuild
   - Check that all dependencies are properly installed
   - Ensure you're using the correct Node.js version (>=18)

2. **Metro Bundler Issues**
   - Clear the Metro cache: `npm start -- --reset-cache`
   - Ensure no other Metro instance is running

3. **Tailwind/NativeWind Issues**
   - Verify babel.config.js includes the nativewind/babel plugin
   - Check that tailwind.config.js is properly configured
   - Ensure all style classes are valid Tailwind classes

4. **Animation Issues**
   - Confirm react-native-reanimated is properly linked
   - Check that the reanimated plugin is included in babel.config.js
   - Ensure you're using the correct animation syntax

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
