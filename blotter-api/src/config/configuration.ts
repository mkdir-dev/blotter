const {
  PORT,

  DB_HOST,
  DB_URI,
  DB_NAME,
  DB_USER,
  DB_PASS,
} = process.env;

export interface Config {
  port: number;

  db_host: string;
  db_uri: string;
  db_name: string;
  db_user: string;
  db_pass: string;
}

export default (): Config => ({
  port: parseInt(PORT) || 8080,

  db_host: DB_HOST,
  db_uri: DB_URI,
  db_name: DB_NAME,
  db_user: DB_USER,
  db_pass: DB_PASS,
});
