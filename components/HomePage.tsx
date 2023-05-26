import { Button, View  } from "react-native";
import React from "react";
import MemeList from "./MemeList";
import styles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigationTypes";
import { useAppSelector } from "../redux/hooks";

type homeScreenProp = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomePage({ navigation, route }: homeScreenProp) {
  const currentMemes=useAppSelector(state => state.memesSlice.memes)
  const currentMemesState=useAppSelector(state => state.memesSlice.state)

  return (
    <View style={styles.container}>
      <View style={styles.fitInLine}>
        <Button
          onPress={() => navigation.navigate("Create")}
          title="Add meme"
          color="#111111"
          accessibilityLabel="Learn more about this button"
        />
      </View>
      {currentMemesState==='done' && <MemeList memeList={currentMemes} />}
    </View>
  );
}
