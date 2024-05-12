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
import { GRPCErrors, handleError } from "@fonoster/common";
import { getLogger } from "@fonoster/logger";
import { status as GRPCStatus, ServerInterceptingCall } from "@grpc/grpc-js";
import { Prisma } from "../db";
import { getTokenFromCall } from "../utils/getTokenFromCall";
import { getUserRefFromToken } from "../utils/getUserRefFromToken";

const logger = getLogger({ service: "identity", filePath: __filename });

type GetWorkspaceRequest = {
  ref: string;
};

type GetWorkspaceResponse = {
  ref: string;
  name: string;
  ownerRef: string;
  createdAt: Date;
  updatedAt: Date;
};

function getWorkspace(prisma: Prisma) {
  return async (
    call: { request: GetWorkspaceRequest },
    callback: (error: GRPCErrors, response?: GetWorkspaceResponse) => void
  ) => {
    try {
      const { ref } = call.request;
      const token = getTokenFromCall(call as unknown as ServerInterceptingCall);
      const ownerRef = getUserRefFromToken(token);

      logger.verbose("getting workspace by id", { ref, ownerRef });

      const workspace = await prisma.workspace.findUnique({
        where: {
          ref,
          ownerRef
        }
      });

      if (!workspace) {
        callback({
          code: GRPCStatus.NOT_FOUND,
          message: "Workspace not found"
        });
        return;
      }

      const response: GetWorkspaceResponse = {
        ref: workspace.ref,
        name: workspace.name,
        ownerRef: workspace.ownerRef,
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt
      };

      callback(null, response);
    } catch (error) {
      handleError(error, callback);
    }
  };
}

export { getWorkspace };
