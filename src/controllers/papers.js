const aws = require('aws-sdk');

const s3 = new aws.S3();

const getAllPapersHandler = async (req, res) => {
  const respBody = {
    success: false,
    message: '',
    data: {},
  };
  try {
    const params = {
      Bucket: `${process.env.S3_BUCKET_NAME}`,
      Prefix: `${process.env.S3_BUCKET_PREFIX}`, // Can be your folder name
    };
    await s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        const { Contents } = data;
        const response = Contents.map((el) => {
          const newObj = { ...el };
          newObj.link = `${process.env.S3_URL}/${el.Key}`;
          return newObj;
        }).map((el) => ({ link: el.link }));

        respBody.success = true;
        respBody.data = response;
        return res.status(200).json(respBody);
      }
    });
  } catch (error) {
    respBody.message = error;
    return res.status(400).json(respBody);
  }
};

module.exports = {
  getAllPapersHandler,
};
