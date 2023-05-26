import React from "react";
import { Text, View } from "react-native";
import Meme from "./Meme";
import { RootStackParamList } from "../navigationTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppSelector } from "../redux/hooks";

type getMemeScreenProps = NativeStackScreenProps<RootStackParamList, "Meme">;
export default function GetMemePage({ navigation, route }: getMemeScreenProps) {
   
  const meme = useAppSelector((state) =>
    state.memesSlice.memes.filter((meme) => {
      return meme.ID === route.params.memeId;
    })[0]
  );
  return (
    <View style={{ flex: 1, backgroundColor: "" }}>
      {meme ? <Meme memeToRender={meme} /> : <Text> Ładowanie</Text>}
    </View>
  );

}
