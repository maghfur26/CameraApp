import { View, Text, Image } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import styles from './styles';
import Form from '../../components/form/form';
import Header from '../../components/header/header';

const HomeScreen = () => {
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
