import { Button, View, Text, Image } from "react-native";
import React from "react";
import { Meme as MemeModel } from "../models";
import { updateMemeGrade } from "../firebase";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Meme( {memeToRender}: {memeToRender: MemeModel}) {
  //const [grade, setGrade] = useState(memeToRender?.grade);/
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function handleIncrease() {
    updateMemeGrade(memeToRender.ID, memeToRender.grade + 1);
  }
  function handleDecrease() {
    updateMemeGrade(memeToRender.ID, memeToRender.grade - 1);
  }
  if (memeToRender) {
    return (
      <View style={styles.content}>
        <View style={styles.fitInLine}>
          <View style={styles.fitInLine}>
            <Text
              style={styles.title}
              onPress={
                () =>
                  navigation.navigate("Meme", {
                    memeId: memeToRender?.ID,
                  })
              }
            >
              {memeToRender.name}
            </Text>
          </View>
          <Button color="green" onPress={handleIncrease} title="+" />
          <Text style={styles.title}>{memeToRender.grade}</Text>
          <Button color="red" onPress={handleDecrease} title="-" />
        </View>
        <Image
          style={styles.image}
          source={{ uri: memeToRender.fileUrl }}
          resizeMode="contain"
        />
      </View>
    );
  } else return <></>;
}
