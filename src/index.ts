export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const conditions = [
      {
        displayName: 'Check Vertical Sklum',
        name: 'Check Vertical Sklum',
        handler: async () => {
          const ctx = strapi.requestContext.get();
          const {model} = ctx.params;
          const modelSchema = strapi.getModel(model);
          if (modelSchema?.attributes?.verticalId) {
            return {verticalId: {$eq: 4}}
          }
          return {}
        }
      },
      {
        displayName: 'Check Vertical Create',
        name: 'Check Vertical Create',
        handler: async () => {
          const ctx = strapi.requestContext.get();
          const {model} = ctx.params;
          const modelSchema = strapi.getModel(model);
          if (modelSchema?.attributes?.verticalId) {
            return {verticalId: {$eq: 6}}
          }
          return {}
        }
      }
    ]
    await strapi.admin.services.permission.conditionProvider.registerMany(conditions);
  },
};
