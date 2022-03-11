const { MongoClient } = require('mongodb');
const { getAllPapers } = require('../service/papers');

describe('', () => {
  it('tests the tests', () => {
    expect(1).toBe(1);
  });
});
describe('papers', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(`${process.env.dbUri}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('cloe-website');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('returns correct fields', async () => {
    jest.setTimeout(60000);
    const papers = await getAllPapers();
  });
});
