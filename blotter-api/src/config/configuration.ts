const {
  PORT,
  JWT_SECRET_KEY,

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
  jwt_secret_key: string;

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
  jwt_secret_key: JWT_SECRET_KEY || 'super-secret-key',

  db_host: DB_HOST,
  db_uri: DB_URI,
  db_name: DB_NAME,
  db_user: DB_USER,
  db_pass: DB_PASS,

  cloud_project_id: CLOUD_PROJECT_ID,
  cloud_private_key: CLOUD_PRIVATE_KEY,
  cloud_client_email: CLOUD_CLIENT_EMAIL,
  cloud_media_bucket: CLOUD_BUCKET_NAME,
  cloud_url: CLOUD_URL,
});
