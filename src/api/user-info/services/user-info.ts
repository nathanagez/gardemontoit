/**
 * user-info service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::user-info.user-info', {
  config: {
    update: {
      policies: ['is-authenticated-user'],
    },
    delete: {
      policies: ['is-authenticated-user'],
    },
  },
});
