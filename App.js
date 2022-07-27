import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { useState } from "react";

// import logo from "./assets/shanas.jpg";

// install dependencies using the expo cli
// eg expo install shanas

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let permissionRes = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionRes.granted) {
      alert("Permission to access images must be granted");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();

    // console.log(result);

    if (result.cancelled) return;

    setImage(result.uri);
  };

  const shareImage = async () => {
    if (Platform.OS === "web") return;

    await Sharing.shareAsync(image);
  };

  if (image) {
    // console.log(image);
    return (
      <View>
        <Image source={{ uri: image }} style={styles.thumbnail} />
        <TouchableOpacity onPress={shareImage} style={styles.button}>
          <Text style={styles.buttonText}>Share Image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Image source={logo} style={{ width: 200, height: 200 }} /> */}

      {/* Loading images from the web use the uri property */}

      {/* {image && <Image source={{ uri: image }} style={styles.thumbnail} />} */}
      <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={styles.image}
      />

      <Text style={styles.text}>To share photo just tap the button below</Text>

      {/* Button in web but in mobile is a touchable(pressable) */}

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Press me</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: "2.5%",
    margin: "3%",
    borderRadius: 5,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  text: { color: "#888", fontSize: 18 },
  image: { width: 200, height: 200, marginBottom: "5%" },
});
