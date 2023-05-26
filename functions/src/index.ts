import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();


//function changing the medialink into the URL, which includes download token
function mediaLinkToDownloadableUrl(object: functions.storage.ObjectMetadata) {
  if (object.mediaLink && object.metadata) {
    var firstPartUrl = object.mediaLink.split("?")[0]; // 'https://www.googleapis.com/download/storage/v1/b/abcbucket.appspot.com/o/songs%2Fsong1.mp3.mp3'
    var secondPartUrl = object.mediaLink.split("?")[1]; // 'generation=123445678912345&alt=media'

    firstPartUrl = firstPartUrl.replace(
      "https://www.googleapis.com/download/storage",
      "https://firebasestorage.googleapis.com"
    );
    firstPartUrl = firstPartUrl.replace("v1", "v0");

    firstPartUrl += "?" + secondPartUrl.split("&")[1]; // 'alt=media'
    firstPartUrl += "&token=" + object.metadata.firebaseStorageDownloadTokens;

    return firstPartUrl;
  } else {
    return null;
  }
}

exports.createMemeDocument = functions.storage
  .object()
  .onFinalize(async (object) => {
    if (!object) {
      functions.logger.error("No object!");
      return null;
    }
    const tempTimestamp = Date.now();
    functions.logger.log("1: Log of object.name, splitted");
    functions.logger.log(object.name?.split(/[\/\.]+/)[1]);
    const tempId = object.name?.split(/[\/\.]+/)[1];
    //const tempId= path.basename(object.name,['.jpeg','jpg']);
    functions.logger.log("2: Log of object itself");
    functions.logger.log(object);
    const tempMemeDoc = {
      ID: tempId,
      name: object.metadata?.name,
      grade: 0,
      timestamp: tempTimestamp,
      fileUrl2: object.mediaLink!,  //prev
      fileUrl: mediaLinkToDownloadableUrl(object), //new
    };
    functions.logger.log("3: log od MemeDoc");
    //const referenceToImage = ref;
    functions.logger.log(tempMemeDoc);
    functions.logger.log("4");
    if (tempId === "" || tempId === undefined) {
      functions.logger.error("Issue with ID!");
      return null;
    }
    return admin
      .firestore()
      .collection("memes")
      .doc(tempId)
      .set(tempMemeDoc)
      .catch(console.error);
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// // Take the text parameter passed to this HTTP endpoint and insert it into
// // Firestore under the path /messages/:documentId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await admin
//     .firestore()
//     .collection("messages")
//     .add({ original: original });
//   // Send back a message that we've successfully written the message
//   res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });

// // Listens for new messages added to /messages/:documentId/original and creates an
// // uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions.firestore
//   .document("/messages/{documentId}")
//   .onCreate((snap, context) => {
//     // Grab the current value of what was written to Firestore.
//     const original = snap.data().original;

//     // Access the parameter `{documentId}` with `context.params`
//     functions.logger.log("Uppercasing", context.params.documentId, original);

//     const uppercase = original.toUpperCase();

//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to Firestore.
//     // Setting an 'uppercase' field in Firestore document returns a Promise.
//     return snap.ref.set({ uppercase }, { merge: true });
//   });