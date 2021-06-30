import nock from 'nock';

export default async () => {
  // globally disable HTTP requests in the test suite
  nock.disableNetConnect();

  // setup some fake AWS credentials
  process.env.AWS_ACCESS_KEY_ID = 'aws_access_key_id';
  process.env.AWS_SECRET_ACCESS_KEY = 'aws_secret_access_key';
  process.env.AWS_REGION = 'us-west-2';
};
