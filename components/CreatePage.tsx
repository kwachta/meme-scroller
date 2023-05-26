import React, { useEffect, useState } from "react";
import styles from "../styles";
import { Text, View, Pressable, Image, Button, TextInput } from "react-native";
import { RootStackParamList } from "../navigationTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { Meme } from "../models";
import { addMeme } from "../firebase";

type createScreenProp = NativeStackScreenProps<RootStackParamList, "Create">;

export default function CreatePage({ navigation, route }: createScreenProp) {
  const [image, setImage] = useState<string | null>(null);
  const [memeName, onChangeText] = React.useState("");

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      var result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        //allowsEditing: true,
        quality: 1,
      });
      //console.log("Result:", result);
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function handleUploadNewMeme() {
    var tempMeme: Partial<Meme>;
    tempMeme = {
      name: memeName,
      fileUrl:
        "https://cdn.pixabay.com/photo/2022/07/12/20/15/cavia-7318119_960_720.jpg",
    };
    
    try {
      if (image){
      await addMeme(tempMeme, image);
      navigation.navigate('Home')
      }
      else
        throw('No image to upload')
    } catch (e) {
      console.log("Error adding document: ", e);
    }
    // Create a storage reference from our storage service
  }

  return (
    <View style={styles.createView}>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text>Pick from storage</Text>
      </Pressable>
      {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      )}
      <TextInput
        style={styles.textInput}
        value={memeName}
        placeholder="Name your meme"
        onChangeText={onChangeText}
      />
      {image && memeName && (
        <Pressable style={styles.button} onPress={handleUploadNewMeme}>
          <Text>Submit</Text>
        </Pressable>
      )}
    </View>
  );
}
