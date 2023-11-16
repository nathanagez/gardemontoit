/**
 * is-authenticated-user policy
 */

import { Strapi } from '@strapi/strapi';
import { errors } from '@strapi/utils';

const { PolicyError, NotFoundError } = errors;
const POLICY_NAME = 'is-authenticated-user';

export default async (policyContext, config, { strapi }: { strapi: Strapi }) => {
  const { params: { id } } = policyContext.request;
  const { user } = policyContext.state;

  if (!user) {
    return false;
  }

  if (!id) {
    return false;
  }

  const ad = await strapi.entityService.findOne(
    'api::user-info.user-info',
    id,
  );

  if (!ad) {
    strapi.log.info(`${POLICY_NAME} - user-info not found`);
    throw new NotFoundError();
  }

  if (user.id !== ad.owner.id) {
    strapi.log.info(`${POLICY_NAME} - invalid user-info owner`);
    throw new PolicyError('Invalid user-info owner', {
      errCode: 'INVALID_USER_INFO_OWNER', // can be useful for identifying different errors on the front end
    });
  }
  return true;
};
