import { View } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';

// import screens
import HomeScreen from './src/screens/Home/HomeScreen';
import LoadingScreen from './src/screens/Loading/LoadingScreen';
import PreviewScreen from './src/screens/preview/PreviewScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import ResponseScreen from './src/screens/Response/ResponseScreen';

// import types
import { RootStackParamList } from './src/types/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <LoadingScreen />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen name="Home" component={HomeScreen} options={
          { headerShown: false }
        }/>
        <Stack.Screen name="Loading" component={LoadingScreen} options={
          { headerShown: false }
        }/>
        <Stack.Screen name="Login" component={LoginScreen} options={
          { headerShown: false }
        }/>
        <Stack.Screen name="Preview" component={PreviewScreen} options={
          { headerShown: false }
        }/>
        <Stack.Screen name="Response" component={ResponseScreen} options={
          { headerShown: false }
        }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
