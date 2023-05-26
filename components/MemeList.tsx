import {ScrollView} from "react-native";
import React from "react";
import Meme from "./Meme";
import { Meme as MemeModel } from "../models";
import styles from "../styles"

const MemeList = ({ memeList }: { memeList: MemeModel[] }) => {
  return (

      <ScrollView style={styles.scrollView}>
        {memeList.map((singleMeme) => {
          return (
            <Meme
              key={singleMeme.ID}
              memeToRender={singleMeme}
            />
          );
        })}
      </ScrollView>
  );
};



export default MemeList;
