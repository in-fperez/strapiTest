'use strict';

module.exports = ({ strapi }) => ({
  async getCalculations() {
    return await strapi.db.query();
  },
});
