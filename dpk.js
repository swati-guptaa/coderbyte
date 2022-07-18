const crypto = require("crypto");
exports.deterministicPartitionKey = (event) => {
  // const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = "0";

  if (event) {
    if (event.partitionKey) {
      candidate = JSON.stringify(event.partitionKey);
    } else {
      // const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    }
  }
//below code is of no use as it can be handled above
  // if (candidate) {
  //   if (typeof candidate !== "string") {
  //     candidate = JSON.stringify(candidate);
  //   }
  // }
    //TRIVIAL_PARTITION_KEY is used only once so default  the cadidate with that
  // } else {
  //   candidate = TRIVIAL_PARTITION_KEY;
  // }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};