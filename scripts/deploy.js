const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const linkContractFactory = await hre.ethers.getContractFactory("LinkHub");
  const linkContract = await linkContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await linkContract.deployed();

  console.log("LinkHub address: ", linkContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();