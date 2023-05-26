import {Meme} from './models'
export type RootStackParamList = {
    Main: undefined;
    Home: {memes: Meme[]} | undefined;
    Create: undefined;
    Meme: { memeId: string };
  };
  