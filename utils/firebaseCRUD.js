const moment = require("moment");
const momenttz = require("moment-timezone");

const { FIREBASE_CONFIG } = require("../config/firebaseConnect.config");
const { dateConverter } = require("./dateConverter");
const { timestampConverter } = require("./timestampConverter");

const firestoreDb = FIREBASE_CONFIG.firestore();

/* 
  Create New Data into Firebase Cloud Firestore.
  @Parameter 
  colletionName: firestore collection name.
  data: data must be an object.
  @Method Example.
  createNewData("Collection Name", dataObj);
*/
const createNewData = async (collectionName, data) => {
  let d = dateConverter(`${data.date}`, "YYYY-MM-D", "D-MMM-YYYY");
  if (!d) {
    return "error date format";
  }
  let timestamp = timestampConverter(d, "D-MMM-YYYY");
  let doc_id = `${timestamp}_${Math.floor(Math.random() * 10000)}`;
  const dataSet = {
    date: d,
    item: data.item,
    pay: data.pay,
    price: parseFloat(data.price).toFixed(2),
    category: data.category,
    type: data.type,
    timestamp: parseInt(timestamp),
  };

  let docRef = await firestoreDb
    .collection(`${collectionName}`)
    .doc(doc_id)
    .set(dataSet);
  return doc_id;
};

/* 
  Read Data from Firebase Cloud Firestore. Fliter by date.
  @Parameter 
  colletionName: firestore collection name.
  fromDate: query data from start date.
  endDate: query data from end date.
  @Method Example.
  readAccountData("2020-09-11", "2020-09-14");
  readAccountData("2020-12-01", "2020-12-12");
  readAccountData("", "");
  readAccountData();
  readAccountData(`${moment().year()}-${moment().month() + 1}-01`, `${moment().year()}-${moment().month() + 1}-${moment().date()}`);
*/
const readAccountData = async (collectionName, fromDate = "", endDate = "") => {
  console.log("readAccountData: ");
  console.log({ fromDate });
  console.log({ endDate });
  const start =
    fromDate === ""
      ? moment(momenttz(moment()).tz("Asia/Taipei").format()).format("X")
      : moment(fromDate).format("X");
  const end =
    endDate === ""
      ? moment(momenttz(moment()).tz("Asia/Taipei").format()).format("X")
      : moment(endDate).format("X");

  console.log({ end });
  console.log("custom: ");
  console.log(moment("2021-09-18", "YYYY-MM-D").format("X"));

  const querySnapshot = await firestoreDb
    .collection(`${collectionName}`)
    .where("timestamp", ">=", parseInt(start))
    .where("timestamp", "<=", parseInt(end))
    .get();
  let expenseData = [];
  querySnapshot.forEach((doc) => {
    let data = { id: doc.id, data: doc.data() };
    expenseData.push(data);
  });
  return expenseData;
};

/* 
  Delete Data from Firebase Cloud Firestore. Delete by documents ID.
  @Parameter 
  colletionName: firestore collection name.
  id: data document id.
  @Method Example.
  removeAccountData("1600012800_5240");
*/
const removeAccountData = async (collectionName, id) => {
  await firestoreDb.collection(`${collectionName}`).doc(`${id}`).delete();
  return id;
};

/* 
  Update Data into Firebase Cloud Firestore.
  @Parameter 
  colletionName: firestore collection name.
  id: data document id.
  data: data must be an object.
  @Method Example.
  updateAccountData("Collection Name", "1600012800_5240", dataObj);
*/
const updateAccountData = async (collectionName, id, data) => {
  removeAccountData(collectionName, id);
  createNewData(collectionName, data);
  return "Update Successful";
};

module.exports = {
  createNewData,
  readAccountData,
  removeAccountData,
  updateAccountData,
};
