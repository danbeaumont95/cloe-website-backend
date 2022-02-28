const { Papers } = require('../model/Papers');

const getAllPapers = async () => {
  try {
    const papers = await Papers.find();
    return papers;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllPapers,
};
