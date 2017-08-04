const { isEmpty, userExists, normalizeUsername, revertJson } = require('../validation-utils');

const normalize = (query) => {
  const _query = {
    id: 'follow',
    json: JSON.stringify([
      'follow', {
        follower: normalizeUsername(query.follower),
        following: normalizeUsername(query.following),
        what: query.what ? JSON.parse(query.what) : ['blog']
      }
    ]),
    required_auths: [],
    required_posting_auths: [normalizeUsername(query.follower)]
  };

  return {
    query: _query,
    type: 'custom_json'
  };
};

const validate = async (query) => {
  const errors = [];

  if (isEmpty(query.following)) {
    errors.push('following is required');
  } else if (!await userExists(query.following)) {
    errors.push(`the user ${query.following} doesn't exist`);
  }

  if (!isEmpty(query.follower) && !await userExists(query.follower)) {
    errors.push(`the user ${query.follower} doesn't exist`);
  }

  return errors;
};

const revertQueryJson = (query) => {
  revertJson(query);
};

module.exports = {
  normalize,
  revertQueryJson,
  validate
};
