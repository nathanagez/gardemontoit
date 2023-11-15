/**
 * ad router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::ad.ad', {
  config: {
    update: {
      policies: ['is-ad-owner'],
    },
    delete: {
      policies: ['is-ad-owner'],
    },
  },
});
