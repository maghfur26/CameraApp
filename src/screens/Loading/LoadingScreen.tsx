import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import styles from './style';
import Logo from '../../../assets/images/logo.png';
import { Image } from 'react-native';
import { getToken } from '../../utils/authStorage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigationTypes';

const LoadingScreen = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const token = await getToken();
      const navigation =
        useNavigation<
          NativeStackNavigationProp<RootStackParamList, 'Loading'>
        >();
      if (token) {
        navigation.navigate('Home');
      }
    };

    checkTokenAndNavigate();

    let interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 0.08;
        if (next >= 1) {
          clearInterval(interval);
          return 1;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <Image source={Logo} style={styles.image} />
      <SafeAreaView>
        <Text style={styles.text}>DISDUKCAPIL</Text>
        <Text style={styles.text}>Kota Tegal</Text>
        <Progress.Bar
          progress={progress}
          width={280}
          height={8}
          color="#0000ff"
          unfilledColor="#e0e0e0"
          borderRadius={5}
          borderWidth={0}
          style={{ marginTop: 20 }}
        />

        <Text style={styles.progressText}>Loading Application</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoadingScreen;
