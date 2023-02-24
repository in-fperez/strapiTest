export default (plugin) => {
  let original = plugin.controllers.relations.findAvailable;
  plugin.controllers.relations.findAvailable = async (ctx) => {
    const {model, targetField} = ctx.params;
    const modelSchema = strapi.getModel(model);
    const attribute = modelSchema.attributes[targetField];
    const targetedModel = strapi.getModel(attribute.target);
    const verticalEnum = {
      'sklum': 4,
      'create': 6,
      "themasie": 9
    };
    const userRolesCodes = ctx.state.user.roles.map(({code}) => code);
    for (let vertical in verticalEnum) {
      console.log(vertical);
      if (userRolesCodes.some((code) => code.includes(vertical))) {
        const objectsToOmit = await strapi.entityService.findMany(targetedModel.uid, {
          filters: {
            $or: [
              {
                verticalId: {$ne: verticalEnum[vertical]}
              },
              {
                verticalId: {$null: true}
              }
            ]
          }
        });
        const idsToOmit = objectsToOmit.map(({id}) => id);
        ctx.request.query = {...ctx.request.query, idsToOmit};
        return original(ctx);
      }
    }
    return original(ctx);
  }
  return plugin;
};