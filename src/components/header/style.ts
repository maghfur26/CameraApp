import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: '#f8f8f8',
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});

export default styles;