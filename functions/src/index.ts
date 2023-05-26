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
    functions.logger.log("2: Log of object itself");
    functions.logger.log(object);
    const tempMemeDoc = {
      ID: tempId,
      name: object.metadata?.name,
      grade: 0,
      timestamp: tempTimestamp,
      fileUrl2: object.mediaLink!, //prev
      fileUrl: mediaLinkToDownloadableUrl(object), //new
    };
    functions.logger.log("3: log od MemeDoc");
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
