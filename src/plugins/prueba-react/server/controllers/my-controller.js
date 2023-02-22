'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    const {roles, id} = ctx.state.user;
    ctx.body = {roles, id};
  },
});
