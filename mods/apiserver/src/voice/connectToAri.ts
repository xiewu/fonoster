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
import { getLogger } from "@fonoster/logger";
import ariClient from "ari-client";
import { connect } from "nats";
import wait from "wait-port";
import { makeCreateContainer } from "./integrations";
import { makeCreateVoiceClient } from "./makeCreateVoiceClient";
import { AriEvent } from "./types";
import { VoiceDispatcher } from "./VoiceDispatcher";
import { prisma } from "../core/db";
import {
  ASTERISK_ARI_PROXY_URL,
  ASTERISK_ARI_SECRET,
  ASTERISK_ARI_USERNAME,
  INTEGRATIONS_FILE,
  NATS_URL
} from "../envs";

const logger = getLogger({ service: "apiserver", filePath: __filename });

const connection = {
  host: ASTERISK_ARI_PROXY_URL.split("//")[1].split(":")[0],
  port: parseInt(ASTERISK_ARI_PROXY_URL.split("//")[1].split(":")[1]),
  timeout: 5000,
  output: "silent" as const
};

async function connectToAri(filesServer) {
  logger.info("waiting for asterisk server");
  const open = await wait(connection);
  if (open) {
    const ari = await ariClient.connect(
      ASTERISK_ARI_PROXY_URL,
      ASTERISK_ARI_USERNAME,
      ASTERISK_ARI_SECRET
    );

    ari.on(AriEvent.WEB_SOCKET_RECONNECTING, () => {
      logger.info("reconnecting to asterisk");
    });

    ari.on(AriEvent.WEB_SOCKET_MAX_RETRIES, () => {
      logger.error("max retries reconnecting to asterisk");
      attemptReconnection(filesServer);
    });

    logger.info("asterisk is ready");

    const createContainer = makeCreateContainer(prisma, INTEGRATIONS_FILE);

    const nats = await connect({ servers: NATS_URL });

    const dispatcher = new VoiceDispatcher(
      ari,
      nats,
      makeCreateVoiceClient(createContainer, filesServer)
    );

    dispatcher.start();
  } else {
    logger.error("asterisk is not ready");
    process.exit(1);
  }
}

function attemptReconnection(filesServer) {
  logger.info("attempting to reconnect in 5 seconds...");
  setTimeout(() => {
    connectToAri(filesServer);
  }, 5000); // Reconnect after 5 seconds
}

export { connectToAri };
