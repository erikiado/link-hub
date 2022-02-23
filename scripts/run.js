const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const linkContractFactory = await hre.ethers.getContractFactory("LinkHub");
  // const linkContract = await linkContractFactory.deploy();
  const linkContract = await linkContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await linkContract.deployed();

  console.log("Contract deployed to:", linkContract.address);
  console.log("Contract deployed by:", owner.address);
  let linkCount;
  
  let contractBalance = await hre.ethers.provider.getBalance(
    linkContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );


  let linkTxn = await linkContract.link('https://nu9ve.xyz/home');
  await linkTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(linkContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  linkCount = await linkContract.getTotalLinks();

  contractBalance = await hre.ethers.provider.getBalance(linkContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  linkTxn = await linkContract.connect(randomPerson).link('http://nu9ve.xyz/');
  await linkTxn.wait();

  // linkTxn = await linkContract.connect(randomPerson).link('http://nu9ve.xyz/');
  // await linkTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(linkContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  linkCount = await linkContract.getTotalLinks();
  let allLinks = await linkContract.getAllLinks();
  console.log(allLinks);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();