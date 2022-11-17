/* eslint-disable import/no-extraneous-dependencies */
import { AxiosInstance } from 'axios';
import { initTestServer } from '../../../../tests/util/setup';
import { cleanupServer } from '../../../../tests/util/cleanup';
import { User } from '../../users/user.model';
import { userSignUpSchema } from '../../users/user.types';
import { expectBaseEndpointFactory } from '../../../../tests/util/moduleIntergrationTests';

let axiosClient: AxiosInstance;
let expectSignUpEndpointToWork: ReturnType<typeof expectBaseEndpointFactory>;

beforeAll(async () => {
  axiosClient = await initTestServer();
  expectSignUpEndpointToWork = expectBaseEndpointFactory<User>(
    'auth',
    userSignUpSchema.omit({ inviteId: true }),
    axiosClient,
  );
});

afterAll(async () => {
  await cleanupServer();
});

jest.setTimeout(20 * 1000);
describe('/auth', () => {
  describe('/signUp and signIn', () => {
    describe('POST', () => {
      test('When request sent, then should add user to DB and user signIn', async () => {
        await expectSignUpEndpointToWork.addEndpoint.authModule.signUpAndSignInApi.happy({ paths: ['signUp', 'signIn'] });
      });
      test('When request sent with extra field, it should strip extra field and return 200', async () => {
        await expectSignUpEndpointToWork.addEndpoint.authModule.signUpAndSignInApi.extraField({ paths: ['signUp', 'signIn'] });
      });
    })
  });
  describe('/forgotPassword', () => {
    describe('POST', () => {
      test('When request sent, then should sent code to email', async () => {
        await expectSignUpEndpointToWork.addEndpoint.authModule.forgotPassword.happy({ paths: ['signUp', 'signIn', 'forgotPassword'] });
      });
      test('When request sent with extra field it will give 400', async () => {
        await expectSignUpEndpointToWork.addEndpoint.authModule.forgotPassword.extraField({ paths: ['signUp', 'signIn', 'forgotPassword'] });
      });
    })
  })
})