// @flow

import cinemaManager from '../../src/index';

describe('UserService', () => {
  let service;
  beforeEach(() => {
    const app = cinemaManager();
    service = app.services.UserService;
  });

  it('createUser', () => {
    const email = 'test@test.com';
    const [user] = service.createUser(email);
    const expected = {
      email,
    };
    expect(user).toMatchObject(expected);
  });
});
