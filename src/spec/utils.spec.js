const {
  expect
} = require('chai');
const {
  findTopTen
} = require('../Utils/utils');

describe('findTopTen', () => {
  it('if empty array return empty array', () => {
    expect(findTopTen([])).to.eql([]);
  });
  it('if array of two objects, locate the votes key and sort descending in value', () => {
    expect(findTopTen([
      {
        "article_id": 33,
        "votes": 10
      },
      {
        "article_id": 28,
        "votes": 20
      }])).to.eql([
        {
          "article_id": 28,
          "votes": 20
        },
        {
          "article_id": 33,
          "votes": 10
        }]);
  });
});