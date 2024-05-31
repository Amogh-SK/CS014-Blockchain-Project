const StudentMarks = artifacts.require("StudentMarks");

module.exports = function(deployer) {
  deployer.deploy(StudentMarks);
};
