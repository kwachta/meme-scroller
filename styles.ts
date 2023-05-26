import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
  content: {
    alignContent: "center",
    marginHorizontal: 20,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#b7bebe",
  },
  scrollView: {
    contentContainerStyle: { flex: 1 },
    backgroundColor: "#677a7a",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    color: "black",
  },
  fitInLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10
  },
  alignRight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  memeImage: {
    width: "100%",
    height: 200,
    alignSelf: "center",
  },
  textInput: {
    backgroundColor: "#d7dede",
    borderColor: "black",
    borderWidth: 1,
    width: "50%",
    margin: 12,
    padding: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "#9ba8a8",
  },
  createView: {
    contentContainerStyle: { flex: 1 },
    //backgroundColor: "#ffffff",
    width: "100%",
    heigth: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 300,
    alignSelf: 'center'
  },
});

export default styles;
