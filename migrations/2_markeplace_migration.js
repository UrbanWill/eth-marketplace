// eslint-disable-next-line no-undef
const MarketplaceMigration = artifacts.require("CourseMarketplace");

module.exports = (deployer) => {
  deployer.deploy(MarketplaceMigration);
};
