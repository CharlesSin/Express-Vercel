// convert date to timestamp
const toTimestamp = (strDate) => {
  let datum = Date.parse(strDate);
  return datum / 1000;
};

module.exports = toTimestamp;
