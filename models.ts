import { Timestamp } from "firebase/firestore";

export type Meme = {
    ID: string;
    name: string;
    fileUrl: string;
    grade: number;
    timestamp: number;
};

export type MemeList = {
    memes: Meme[]
}