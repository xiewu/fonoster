/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonoster
 *
 * This file is part of Fonoster
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import fs from "fs";
import { join } from "path";
import { assertEnvsAreSet, assertFileExists } from "@fonoster/common";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: join(__dirname, "..", "..", "..", ".env") });
}

const e = process.env;

assertEnvsAreSet([
  "APP_URL",
  "CLOAK_ENCRYPTION_KEY",
  "SMTP_HOST",
  "SMTP_SENDER",
  "SMTP_AUTH_USER",
  "SMTP_AUTH_PASS",
  "IDENTITY_DATABASE_URL",
  "DATABASE_URL",
  "INFLUXDB_URL",
  "INFLUXDB_INIT_USERNAME",
  "INFLUXDB_INIT_PASSWORD",
  "INFLUXDB_INIT_ORG",
  "INFLUXDB_INIT_BUCKET",
  "INFLUXDB_INIT_TOKEN",
  "ASTERISK_ARI_PROXY_URL",
  "ASTERISK_ARI_USERNAME",
  "ASTERISK_ARI_SECRET",
  "NATS_URL"
]);

const IDENTITY_PRIVATE_KEY_PATH =
  e.IDENTITY_PRIVATE_KEY_PATH || "/opt/fonoster/keys/private.pem";
const IDENTITY_PUBLIC_KEY_PATH =
  e.IDENTITY_PUBLIC_KEY_PATH || "/opt/fonoster/keys/public.pem";

assertFileExists(IDENTITY_PRIVATE_KEY_PATH);
assertFileExists(IDENTITY_PUBLIC_KEY_PATH);

export const APISERVER_BIND_ADDR = e.APISERVER_BIND_ADDR || "0.0.0.0:50051";

export const APISERVER_HOST = e.APISERVER_HOST || "apiserver";

// Frontend configurations
export const APP_URL = e.APP_URL;

export const ASTERISK_ARI_PROXY_URL = e.ASTERISK_ARI_PROXY_URL;

export const ASTERISK_ARI_SECRET = e.ASTERISK_ARI_SECRET;

export const ASTERISK_ARI_USERNAME = e.ASTERISK_ARI_USERNAME;

export const ASTERISK_SYSTEM_DOMAIN = e.ASTERISK_SYSTEM_DOMAIN || "sip.invalid";

export const ASTERISK_TRUNK = "routr";

export const CALLS_CREATE_SUBJECT = "calls.create";

export const CALLS_TRACK_CALL_SUBJECT = "calls.track";

// Other configurations
export const CLOAK_ENCRYPTION_KEY = e.CLOAK_ENCRYPTION_KEY;

export const DEFAULT_NATS_QUEUE_GROUP = "apiserver";

// Custom email templates
export const EMAIL_TEMPLATES_DIR = e.EMAIL_TEMPLATES_DIR;

export const FILES_SERVER_PORT = e.FILES_SERVER_PORT
  ? parseInt(e.FILES_SERVER_PORT)
  : 9876;

export const IDENTITY_ACCESS_TOKEN_EXPIRES_IN =
  e.IDENTITY_ACCESS_TOKEN_EXPIRES_IN || "15m";

export const IDENTITY_AUDIENCE = e.IDENTITY_AUDIENCE || "api";

export const IDENTITY_ID_TOKEN_EXPIRES_IN =
  e.IDENTITY_ID_TOKEN_EXPIRES_IN || "15m";

// Identity configurations
export const IDENTITY_ISSUER = e.IDENTITY_ISSUER || "https://fonoster.local";

export const IDENTITY_PRIVATE_KEY = fs.readFileSync(
  IDENTITY_PRIVATE_KEY_PATH,
  "utf8"
);

export const IDENTITY_PUBLIC_KEY = fs.readFileSync(
  IDENTITY_PUBLIC_KEY_PATH,
  "utf8"
);

export const IDENTITY_REFRESH_TOKEN_EXPIRES_IN =
  e.IDENTITY_REFRESH_TOKEN_EXPIRES_IN || "24h";

export const INFLUXDB_BUCKET = e.INFLUXDB_INIT_BUCKET;

export const INFLUXDB_ORG = e.INFLUXDB_INIT_ORG;

export const INFLUXDB_PASSWORD = e.INFLUXDB_INIT_PASSWORD;

export const INFLUXDB_TOKEN = e.INFLUXDB_INIT_TOKEN;

// InfluxDB configurations
export const INFLUXDB_URL = e.INFLUXDB_URL;

export const INFLUXDB_USERNAME = e.INFLUXDB_INIT_USERNAME;

export const INTEGRATIONS_FILE =
  e.INTEGRATIONS_FILE || "/opt/fonoster/integrations.json";

export const NATS_URL = e.NATS_URL;

export const OWNER_EMAIL = e.OWNER_EMAIL;

// Default owner configurations (If OWNER_EMAIL is set, the system will create a default user and a workspace)
export const OWNER_NAME = e.OWNER_NAME || "Admin";

export const OWNER_PASSWORD = e.OWNER_PASSWORD || "changeme";

export const ROUTR_API_ENDPOINT = e.ROUTR_API_ENDPOINT || "routr:51907";

export const ROUTR_DEFAULT_PEER_AOR =
  e.ROUTR_DEFAULT_PEER_AOR || "sip:voice@default";

export const ROUTR_DEFAULT_PEER_NAME =
  e.ROUTR_DEFAULT_PEER_NAME || "Voice Server";

export const ROUTR_DEFAULT_PEER_PASSWORD =
  e.ROUTR_DEFAULT_PEER_PASSWORD || "changeme";

export const ROUTR_DEFAULT_PEER_USERNAME =
  e.ROUTR_DEFAULT_PEER_USERNAME || "voice";

export const SMTP_AUTH_PASS = e.SMTP_AUTH_PASS;

export const SMTP_AUTH_USER = e.SMTP_AUTH_USER;
// SMTP configurations
export const SMTP_HOST = e.SMTP_HOST;
export const SMTP_PORT = e.SMTP_PORT ? parseInt(e.SMTP_PORT) : 587;
export const SMTP_SECURE = e.SMTP_SECURE?.toLowerCase() === "true";
export const SMTP_SENDER = e.SMTP_SENDER;
