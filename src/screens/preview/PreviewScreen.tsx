// src/screens/Preview/PreviewScreen.tsx
import React from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './style';
import { RootStackParamList } from '../../types/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PreviewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Preview'
>;

interface FormData {
  fullName: string;
  asalSekolah: string;
  tanggalLahir: string;
  photo: string | null;
}

interface RouteParams {
  formData: FormData;
}

const PreviewScreen = () => {
  const navigation = useNavigation<PreviewScreenNavigationProp>();
  const route = useRoute();
  const { formData } = route.params as RouteParams;

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const handleUpload = () => {
    navigation.navigate('Response');
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={26} color="#4B4DED" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Data Peserta</Text>
      </View>

      {/* Photo Section */}
      <View style={styles.photoCard}>
        {formData.photo ? (
          <Image source={{ uri: formData.photo }} style={styles.photo} />
        ) : (
          <View style={styles.noPhoto}>
            <MaterialIcons name="person" size={60} color="#4B4DED" />
            <Text style={styles.noPhotoText}>Tidak ada foto</Text>
          </View>
        )}
      </View>

      {/* Data Section */}
      <View style={styles.dataCard}>
        <View style={styles.dataRow}>
          <MaterialIcons name="badge" size={20} color="#4B4DED" />
          <View style={styles.dataText}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <Text style={styles.value}>{formData.fullName}</Text>
          </View>
        </View>

        <View style={styles.dataRow}>
          <MaterialIcons name="school" size={20} color="#4B4DED" />
          <View style={styles.dataText}>
            <Text style={styles.label}>Asal Sekolah</Text>
            <Text style={styles.value}>{formData.asalSekolah}</Text>
          </View>
        </View>

        <View style={styles.dataRow}>
          <MaterialIcons name="event" size={20} color="#4B4DED" />
          <View style={styles.dataText}>
            <Text style={styles.label}>Tanggal Lahir</Text>
            <Text style={styles.value}>
              {formatDate(formData.tanggalLahir)}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => handleUpload()}
        activeOpacity={0.8}
      >
        <MaterialIcons name="cloud-upload" size={22} color="#fff" />
        <Text style={styles.uploadButtonText}> Upload ke Google Drive</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default PreviewScreen;
