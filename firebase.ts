import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  Firestore,
  updateDoc,
} from "firebase/firestore";
import { Meme } from "./models";
import uuid from "react-native-uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import Constants from "expo-constants";

const config = {
  apiKey: Constants?.manifest?.extra?.apiKey,
  authDomain: Constants?.manifest?.extra?.authDomain,
  projectId: Constants?.manifest?.extra?.projectId,
  storageBucket: Constants?.manifest?.extra?.storageBucket,
  messagingSenderId: Constants?.manifest?.extra?.messagingSenderId,
  appId: Constants?.manifest?.extra?.appId,
  measurementId: Constants?.manifest?.extra?.measurementId,
};

let app: FirebaseApp;
let db: Firestore;

//////Initialization of DB and storage
//Init database
app = initializeApp(config);
if (app == null) throw "Connection to Firebase failed";
db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

//uploads an image to the google cloud with name in custom
//cloud trigger creates the doc in firebase
const uploadImageToStorage = async (
  image: string,
  memeName: string,
  ref: StorageReference
) => {
  const response = await fetch(image);
  const blobFile = await response.blob();
  const metadata = {
    customMetadata: {
      name: memeName,
    },
  };
  try {
    await uploadBytes(ref, blobFile, metadata);
    console.log("Upload successful");
  } catch (error) {
    console.log(error);
  }
};

//adds an image to the storage and firebase
const addMeme = async (meme: Partial<Meme>, image: string) => {
  //assure there is no another same meme
  try {
    var idForUpload = uuid.v4().toString();
    var nameForUpload = meme.name || "No name";
    var fileExt = image.split(/[#?]/)[0].split(".").pop()?.trim();
    const storedFileRef = ref(storage, `images/${idForUpload}.${fileExt}`);
    await uploadImageToStorage(image, nameForUpload, storedFileRef);
    var fileDownloadUrl = await getDownloadURL(storedFileRef);
    return idForUpload;
  } catch (e) {
    console.error("Error adding meme: ", e);
    return null;
  }
};

//get a single meme with know Id
const getMemeById = async (id: string) => {
  console.log("Getting meme with id", id);
  try {
    const memeDocRef = doc(db, "memes", id);
    const receivedDoc = await getDoc(memeDocRef);
    const receivedData = receivedDoc.data();
    try {
      const receivedMeme = {
        ID: receivedDoc.id,
        name: receivedData?.name,
        fileUrl: receivedData?.fileUrl,
        grade: receivedData?.grade,
      } as Meme;
      return receivedMeme;
    } catch (e) {
      console.error("Error getting meme from database: ", e);
    }
  } catch (e) {
    console.error("Error getting meme from database: ", e);
    return null;
  }
};

//change the meme grade with known ID
const updateMemeGrade = async (id: string, newGrade: number) => {
  //console.log("Updating meme with id:", id);
  const memeToUpdateRef = doc(db, "memes", id);
  await updateDoc(memeToUpdateRef, {
    grade: newGrade,
  });
};

export { db, addMeme, updateMemeGrade, getMemeById, uploadImageToStorage };
