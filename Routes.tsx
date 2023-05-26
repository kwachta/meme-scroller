import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/HomePage";
import CreatePage from "./components/CreatePage";
import GetMemePage from "./components/GetMemePage";
import { RootStackParamList } from "./navigationTypes";
import { Meme as MemeModel, MemeList } from "./models";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import { AppDispatch } from "./redux/store";
import { useDispatch } from "react-redux";
import { setMemeListState } from "./redux/memeListSlice";

const RootStack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const colRef = collection(db, "memes");
    const q = query(colRef, orderBy("timestamp", "desc"));
    var receivedMemes: MemeList = {
      memes: [],
    };
    //console.log("Dane z firebase -> REDUX");
    const unsubSnapshot = onSnapshot(q, (snapshot) => {
      receivedMemes.memes = snapshot.docs.map((doc) => {
        var tempMeme: MemeModel = {
          ID: doc.data().ID,
          fileUrl: doc.data().fileUrl,
          grade: doc.data().grade,
          name: doc.data().name,
          timestamp: doc.data().timestamp,
        };

        return tempMeme;
      });
      console.log("DB is updated");
      //console.log("Test w Routes.tsx", receivedMemes);
      dispatch(setMemeListState(receivedMemes));
    });
    return unsubSnapshot;
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Create" component={CreatePage} />
        <RootStack.Screen
          name="Meme"
          component={GetMemePage}
          options={{ headerTitle: "" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
