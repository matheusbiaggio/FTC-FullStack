const adminMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    // senha: secret_admin
};

const userInvalidMock = {
  id: 1,
  username: 'User',
  role: 'user',
  email: '@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
    // senha: secret_user
};

const messageFieldsUnfilled = 'All fields must be filled';

const messageInvalidFields = 'Invalid email or password';

export {
  adminMock,
  messageFieldsUnfilled,
  messageInvalidFields,
  userInvalidMock,
};