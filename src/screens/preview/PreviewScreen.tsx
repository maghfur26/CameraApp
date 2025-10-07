import React from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './style';
import { RootStackParamList } from '../../types/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from '../../config/api';
import UploadProgressScreen from '../upload/uploadScreen';

type PreviewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Preview'
>;

interface FormData {
  fullName: string;
  asalSekolah: string;
  tglLahir: string; 
  photo: string | null;
}

interface RouteParams {
  formData: FormData;
}

const PreviewScreen = () => {
  const navigation = useNavigation<PreviewScreenNavigationProp>();
  const route = useRoute();
  const { formData } = route.params as RouteParams;
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  const formatDate = (isoString?: string) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
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
    return `${date.getDate().toString().padStart(2, '0')} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('asalSekolah', formData.asalSekolah);
      data.append('tglLahir', formData.tglLahir); // langsung ISO

      if (formData.photo) {
        data.append('photo', {
          uri: formData.photo,
          type: 'image/jpeg',
          name: 'photo.jpg',
        } as any);
      }

      const res = await api.post('/api/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          if (progressEvent.total && progressEvent.loaded) {
            setUploadProgress(
              Math.min(progressEvent.loaded / progressEvent.total, 1),
            );
          } else {
            setUploadProgress(Math.min(progressEvent.loaded / 1000000, 0.95));
          }
        },
      });

      if (res.status === 200) {
        setUploadProgress(1);
        setTimeout(() => {
          setIsUploading(false);
          navigation.navigate('Response');
        }, 300);
      }
    } catch (err: any) {
      console.error('Upload error:', err.response?.data || err.message);
      setUploadProgress(0);
      setIsUploading(false);
    }
  };

  return (
    <>
      {isUploading ? (
        <UploadProgressScreen progress={uploadProgress} />
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <MaterialIcons name="arrow-back" size={26} color="#4B4DED" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Review Data Peserta</Text>
          </View>

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
                  {formatDate(formData.tglLahir)}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUpload}
            activeOpacity={0.8}
          >
            <MaterialIcons name="cloud-upload" size={22} color="#fff" />
            <Text style={styles.uploadButtonText}> Upload ke Google Drive</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
};

export default PreviewScreen;
