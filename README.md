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

- Node.js
- npm or yarn
- React Native development environment setup

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ECommerceApp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on Android:
```bash
npm run android
# or
yarn android
```

5. Run on iOS:
```bash
npm run ios
# or
yarn ios
```

## Project Structure

```
src/
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── utils/         # Utilities and context
└── components/    # Reusable components
```

## Screens

- **SplashScreen**: Initial loading screen with animations
- **LoginScreen**: User authentication
- **SignupScreen**: New user registration
- **HomeScreen**: Main product browsing
- **ProductListScreen**: Product catalog with search
- **ProductDetailScreen**: Detailed product view
- **CartScreen**: Shopping cart management
- **CheckoutScreen**: Multi-step checkout process

## State Management

The app uses React Context API for state management, with the following features:
- User authentication state
- Shopping cart management
- Theme preferences
- Loading and error states

## Styling

The app uses Tailwind CSS through NativeWind for styling, providing:
- Consistent design system
- Responsive layouts
- Easy theme customization
- Utility-first CSS approach

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
