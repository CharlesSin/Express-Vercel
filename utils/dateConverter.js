const moment = require("moment");

/* 
  Update Data into Firebase Cloud Firestore.
  @Parameter 
  dateStr: date string.
  preFormat: old format date string.
  latFormat: new format date string.
  @Method Example.
  let dateStr = "24/Apr/2020";
  let oldFormat = "D/MMM/YYYY";
  let newFormat = "D-MMM-YYYY";
  dateConverter(dateStr, oldFormat, newFormat);
*/
const dateConverter = (dateStr, preFormat, latFormat) => {
  let preDate = moment(dateStr, preFormat, true);
  let latDate = moment(dateStr, latFormat, true);

  // if Invaild Format.
  if (!preDate.isValid() && !latDate.isValid()) {
    return false;
  }
  if (latDate.isValid()) {
    return dateStr;
  } else {
    let newDate = moment(dateStr, preFormat);
    return moment(newDate).format(latFormat);
  }
};

module.exports = { dateConverter };
