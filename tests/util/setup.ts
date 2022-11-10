/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import nock from 'nock';
// import getApp from '../../app';
// import { startServer } from '../../lib/server';
import server from '../../src/server';

/**
 * Starts a test server and connects for API calls
 * @returns Axios client connected to test server
 */
export const initTestServer = async () => {
  const { address } = server;
  const port = address && typeof address !== 'string' ? address.port : null;
  const axiosConfig = {
    baseURL: `http://127.0.0.1:${port}/api`,
    validateStatus: () => true,
  };

  nock.disableNetConnect();
  nock.enableNetConnect('127.0.0.1');

  return axios.create(axiosConfig);
};

export default initTestServer;
