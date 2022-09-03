const moment = require("moment");

const timestampConverter = (dateStr, formatter) => {
  return moment(dateStr, formatter).format("X");
};

module.exports = { timestampConverter };
