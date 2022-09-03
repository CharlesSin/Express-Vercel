const { fireConfig } = require("../config/firebaseConnect.config");

// let firestoreDb = fireConfig_adoptpet.firestore(); // Account2021
let firestoreDb = fireConfig_babycare.firestore(); // account2020

// Backup data from firebase.
const backupAccountData = async (collectionName) => {
  const firestoreDb =
    collectionName === "account2020"
      ? fireConfig_babycare.firestore()
      : fireConfig_adoptpet.firestore();
  const querySnapshot = await firestoreDb.collection(`${collectionName}`).get();

  let accountObj = [];

  querySnapshot.forEach((doc) => {
    const documentItem = doc.data();
    // console.log({ documentItem });
    documentItem.id = doc.id;
    accountObj.push(documentItem);
  });

  return accountObj;
};

const saveBackupLogger = async (saveFileName, year) => {
  const dataSet = {
    filename: saveFileName,
    backupDate: `${new Date().toISOString().slice(0, 10)}`,
    backTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  };

  await fireConfig_chatroom
    .firestore()
    .collection("backuplogger")
    .doc(year)
    .set(dataSet);
};

module.exports = { backupAccountData, saveBackupLogger };

// Method Example.
// backupAccountData("Account2021");
