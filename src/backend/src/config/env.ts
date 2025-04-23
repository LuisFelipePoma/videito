import dotenv from "dotenv";

dotenv.config();

const {
  NODE_ENV = "development",
  PORT = 3000,

  // Database
  DB_HOST = "localhost",
  DB_PORT = 5432,
  DB_NAME = "videito",
  DB_USER = "postgres",
  DB_PASSWORD = "",

  // JWT
  JWT_SECRET = "changeme",
  JWT_EXPIRES_IN = "1d",

  // AWS
  AWS_REGION = "",
  AWS_ACCESS_KEY_ID = "",
  AWS_SECRET_ACCESS_KEY = "",
  S3_BUCKET_NAME = "",
  SAGEMAKER_ENDPOINT_NAME = "",

  // MediaSoup
  MEDIASOUP_MIN_PORT = 10000,
  MEDIASOUP_MAX_PORT = 10100,
} = process.env;

export const EnvConfig = {
  env: NODE_ENV,
  port: PORT,
  db: {
    host: DB_HOST,
    port: Number(DB_PORT),
    name: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  },
  jwt: {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRES_IN,
  },
  aws: {
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    s3BucketName: S3_BUCKET_NAME,
    sagemakerEndpointName: SAGEMAKER_ENDPOINT_NAME,
  },
  mediasoup: {
    minPort: Number(MEDIASOUP_MIN_PORT),
    maxPort: Number(MEDIASOUP_MAX_PORT),
  },
};
