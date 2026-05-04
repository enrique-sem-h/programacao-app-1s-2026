import { Pressable, Text, StyleSheet } from "react-native";

export default function MainButton({ title, onPress, disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: "1%",
    padding: "3%",
    maxWidth: "80%",
    backgroundColor: "#2a5ee2",
    borderRadius: 16,
    alignItems: "center",
    color: "#fff",
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
