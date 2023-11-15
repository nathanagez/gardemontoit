/**
 * is-ad-owner policy
 */

import { Strapi } from '@strapi/strapi';
import { errors } from '@strapi/utils';

const { PolicyError, NotFoundError } = errors;
const POLICY_NAME = 'is-ad-owner';

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
    'api::ad.ad',
    id,
    {
      populate: ['owner'],
    },
  );

  if (!ad) {
    strapi.log.info(`${POLICY_NAME} - ad not found`);
    throw new NotFoundError();
  }

  if (user.id !== ad.owner.id) {
    strapi.log.info(`${POLICY_NAME} - invalid ad owner`);
    throw new PolicyError('Invalid ad owner', {
      errCode: 'INVALID_AD_OWNER', // can be useful for identifying different errors on the front end
    });
  }
  return true;
};
