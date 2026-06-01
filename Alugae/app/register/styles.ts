import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: "4%",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: "transparent",
    paddingTop: 20,
  },
  backButton: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    paddingHorizontal: "5%",
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: "2%",
  },
  input: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 16,
    marginBottom: 15,
    width: "100%",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#444",
  },
  buttonWrapper: {
    marginTop: 20,
    backgroundColor: "transparent",
    alignItems: "center",
  },
});
