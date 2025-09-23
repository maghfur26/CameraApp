import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Tambahkan flex: 1 agar mengisi seluruh layar
    backgroundColor: '#ffffffff',
  },
  headerSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginTop: 20,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  formSection: {
    flex: 1, // Biarkan form mengambil sisa ruang yang tersedia
    paddingHorizontal: 16,
  },
});

export default styles;
