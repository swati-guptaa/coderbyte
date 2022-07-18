const { deterministicPartitionKey } = require("./dpk");

//Note: We can  mock crypto.createHash and test below scenarios. Here I am just testing it with length of the hash created

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns event hash when no partition key is given", () => {
    const trivialKey = deterministicPartitionKey({otherParams:'abc'});
    expect(trivialKey.length>0).toBe(true);
  });

  it("Returns partition key hash when proper event is given", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:"PARTITION_KEY",otherParams:'abc'});
    expect(trivialKey.length>0).toBe(true);
  });

  it("Returns partition key hash when proper event is given with partition key more thank limit", () => {
    let PARTITION_KEY = "key";
    for(let i=0;i<300;i++){
      PARTITION_KEY += i;
    }
    const trivialKey = deterministicPartitionKey({partitionKey:PARTITION_KEY,otherParams:'abc'});
    expect(trivialKey.length>0).toBe(true);
  });
});
