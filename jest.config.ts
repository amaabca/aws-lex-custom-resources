import type { Config } from '@jest/types';
import nock from 'nock';

// globally disable HTTP requests in the test suite
nock.disableNetConnect();

// set up some fake AWS credentials
process.env.AWS_ACCESS_KEY_ID = 'aws_access_key_id';
process.env.AWS_SECRET_ACCESS_KEY = 'aws_secret_access_key';
process.env.AWS_REGION = 'us-west-2';

const config: Config.InitialOptions = {
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  testRegex: '/__tests__/*',
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ]
};

export default config;
