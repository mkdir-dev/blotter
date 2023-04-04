const {
  PORT,

  AT_JWT_SECRET_KEY,
  RT_JWT_SECRET_KEY,
  AT_JWT_SECRET_KEY_TIMEOUT,
  RT_JWT_SECRET_KEY_TIMEOUT,

  DB_HOST,
  DB_URI,
  DB_NAME,
  DB_USER,
  DB_PASS,

  CLOUD_PROJECT_ID,
  CLOUD_PRIVATE_KEY,
  CLOUD_CLIENT_EMAIL,
  CLOUD_BUCKET_NAME,
  CLOUD_URL,
} = process.env;

export interface Config {
  port: number;

  at_jwt_secret_key: string;
  rt_jwt_secret_key: string;
  at_jwt_secret_key_timeout: string | number;
  rt_jwt_secret_key_timeout: string | number;

  db_host: string;
  db_uri: string;
  db_name: string;
  db_user: string;
  db_pass: string;

  cloud_project_id: string;
  cloud_private_key: string;
  cloud_client_email: string;
  cloud_media_bucket: string;
  cloud_url: string;
}

export default (): Config => ({
  port: parseInt(PORT) || 8080,

  // jwt config
  at_jwt_secret_key: AT_JWT_SECRET_KEY || 'super-secret-key',
  rt_jwt_secret_key: RT_JWT_SECRET_KEY || 'super-secret-key',
  at_jwt_secret_key_timeout: AT_JWT_SECRET_KEY_TIMEOUT || '1h',
  rt_jwt_secret_key_timeout: RT_JWT_SECRET_KEY_TIMEOUT || '1d',

  // DB config
  db_host: DB_HOST,
  db_uri: DB_URI,
  db_name: DB_NAME,
  db_user: DB_USER,
  db_pass: DB_PASS,

  // cloud config
  cloud_project_id: CLOUD_PROJECT_ID,
  cloud_private_key: CLOUD_PRIVATE_KEY,
  cloud_client_email: CLOUD_CLIENT_EMAIL,
  cloud_media_bucket: CLOUD_BUCKET_NAME,
  cloud_url: CLOUD_URL,
});
