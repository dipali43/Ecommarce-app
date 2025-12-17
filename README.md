# React Native E-commerce App

A mini E-commerce application built with React Native, Redux Toolkit, and AsyncStorage.

## Features
- **Product Listing**: Fetches products from [FakeStoreAPI](https://fakestoreapi.com/).
- **Product Details**: View detailed product information.
- **Cart Management**: Add/Remove items, view total price.
- **Authentication**: 
  - Mock login (`test@zignuts.com` / `123456`).
  - Auto-login persistence.
  - Login required only for "Add to Cart".
- **Order Management**: Place orders and view order history (persisted locally).
- **Theme**: Dark/Light mode support.

## Tech Stack
- **Framework**: React Native (CLI)
- **Navigation**: React Navigation (Native Stack)
- **State Management**: Redux Toolkit
- **Persistence**: AsyncStorage
- **Networking**: Axios
- **Language**: TypeScript

## Project Structure
```
src/
  ├── assets/          # Images and Icons
  ├── components/      # Reusable UI Components
  ├── constants/       # App Constants (Colors, Theme)
  ├── hooks/           # Custom Hooks (Redux, Theme)
  ├── navigation/      # Navigation Setup
  ├── redux/           # Redux Slices & Store
  ├── screens/         # App Screens
  ├── services/        # API & Storage Services
  └── utils/           # Helper Functions
```

## Setup & Running
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run on Android**:
   ```bash
   npm run android
   ```

3. **Run on iOS**:
   ```bash
   npm run ios
   ```
# Ecommarce-app
# Ecommarce-app
