import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#eeeeeeff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    height: 900,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 20,
    zIndex: 1000,
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logout: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    backgroundColor: '#e00505ff',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default styles;