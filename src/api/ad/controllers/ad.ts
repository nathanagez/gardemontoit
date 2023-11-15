/**
 * ad controller
 */
import { Strapi } from '@strapi/types';

const { createCoreController } = require('@strapi/strapi').factories;

export default createCoreController('api::ad.ad', ({ strapi }: { strapi: Strapi }) => ({
  async create(ctx) {
    const { user } = ctx.state;
    const { body } = ctx.request;

    return strapi.entityService.create('api::ad.ad', {
      data: {
        title: body.data.title,
        description: body.data.description,
        owner: user.id,
        publishedAt: Date.now(),
      },
    });
  },
}));
