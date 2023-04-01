const {
  CLOUD_PROJECT_ID,
  CLOUD_PRIVATE_KEY,
  CLOUD_CLIENT_EMAIL,
  CLOUD_BUCKET_NAME,
  CLOUD_URL,
} = process.env;

export interface CloudConfig {
  cloud_project_id: string;
  cloud_private_key: string;
  cloud_client_email: string;
  cloud_media_bucket: string;
  cloud_url: string;
}

export const cloudConfig: CloudConfig = {
  cloud_project_id: CLOUD_PROJECT_ID,
  cloud_private_key: CLOUD_PRIVATE_KEY,
  cloud_client_email: CLOUD_CLIENT_EMAIL,
  cloud_media_bucket: CLOUD_BUCKET_NAME,
  cloud_url: CLOUD_URL,
};
