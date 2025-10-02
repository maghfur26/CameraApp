import { View, Text, Image } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import styles from './styles';
import Form from '../../components/form/form';
import Header from '../../components/header/header';
import { useFocusEffect } from '@react-navigation/native';
import { getAccessToken } from '../../utils/authStorage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        const token = await getAccessToken();
        if (!token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      };
      checkToken();
    }, [navigation]),
  );
  return (
    <View style={styles.container}>
      <Header />

      {/* Header Section dengan Logo */}
      <View style={styles.headerSection}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.titleText}>Pemerintah Kota Tegal</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <Form />
      </View>
    </View>
  );
};

export default HomeScreen;
