/**
 * mock接口案例2
 * @url /example-links
 * Here you can write a detailed description
 * of the parameters of the information.
 */

module.exports = {
  "code": function () { // simulation error code, 1/10 probability of error code 1.
    return Math.random() < 0.1 ? 1 : 0;
  },
  "list|5-10": [
    {"title": "@title", "link": "@url"}
  ]
};