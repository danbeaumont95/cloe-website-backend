const aws = require('aws-sdk');
const multiparty = require('multiparty');
const fs = require('fs');
const moment = require('moment');
const { upload } = require('../helpers/aws');
const { Papers } = require('../model/Papers');
const { getAllPapers } = require('../service/papers');

const s3 = new aws.S3();

// eslint-disable-next-line consistent-return
const getAllS3PapersHandler = async (req, res) => {
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
    // eslint-disable-next-line consistent-return
    await s3.listObjectsV2(params, (err, data) => {
      if (err) {
        throw new Error(err);
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

// eslint-disable-next-line consistent-return
const postPapersHandler = async (req, res) => {
  const respBody = {
    success: false,
    message: '',
    data: {},
  };
  try {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      const { title, body, dateCreated } = fields;
      const newPaperTitle = title[0];
      const newPaperBody = body[0];
      const dateWrote = dateCreated[0];
      const formattedDate = moment(dateWrote).format('YYYY-MM-DD[T]HH:mm:ss');

      if (!title) {
        throw new Error('[BadRequest] Paper needs a title');
      }
      const newPaper = await Papers.create({
        title: newPaperTitle, body: newPaperBody, dateWrote: formattedDate,
      });
      const { _id } = newPaper;
      if (error) {
        throw new Error(error);
      }

      if (!files.file) {
        respBody.success = true;
        respBody.data = newPaper;
        return res.status(200).json(respBody);
      }
      const { path } = files.file[0];

      const buffer = fs.readFileSync(path);

      const fileName = `papers/${newPaperTitle}/${_id}/${newPaperTitle}`;

      const data = await upload(buffer, fileName);

      const updatedPaper = await Papers.findByIdAndUpdate(_id, {
        $set: {
          link: data.Location,
        },
      }, {
        new: true,
      }).lean();

      respBody.success = true;
      respBody.data = updatedPaper;
      return res.status(200).json(respBody);
    });
  } catch (error) {
    respBody.message = error;
    return res.status(400).json(respBody);
  }
};

const getAllPapersHandler = async (req, res) => {
  const respBody = {
    success: false,
    message: '',
    data: {},
  };
  try {
    const allPapers = await getAllPapers();
    if (!allPapers) {
      respBody.message = '[BadRequest] Unable to find papers';
      return res.status(400).json(respBody);
    }
    if (!allPapers.length) {
      respBody.success = true;
      respBody.message = '[BadRequest] No papers posted yet';
      return res.status(200).json(respBody);
    }
    respBody.success = true;
    respBody.data = allPapers;
  } catch (error) {
    return res.send({ error: error.message });
  }
  return res.status(200).json(respBody);
};

module.exports = {
  getAllS3PapersHandler,
  postPapersHandler,
  getAllPapersHandler,
};
