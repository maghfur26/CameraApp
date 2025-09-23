import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  photoCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
  },
  photo: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  noPhoto: {
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  noPhotoText: {
    color: '#777',
    fontSize: 14,
    marginTop: 8,
  },
  dataCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  dataText: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: '#666',
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginTop: 2,
  },
  uploadButton: {
    marginHorizontal: 16,
    marginBottom: 40,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: '#4B4DED',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;
