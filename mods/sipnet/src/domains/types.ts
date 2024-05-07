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
import * as RTypes from "./client";

type Domain = Omit<RTypes.Domain, "extended">;

type CreateDomainRequest = Omit<RTypes.CreateDomainRequest, "extended">;

type CreateDomainResponse = RTypes.CreateDomainResponse;

type UpdateDomainRequest = Omit<RTypes.UpdateDomainRequest, "extended">;

type UpdateDomainResponse = RTypes.UpdateDomainResponse;

type GetDomainByRefRequest = RTypes.GetDomainRequest;

type ListDomainsRequest = RTypes.ListDomainsRequest;

type ListDomainsResponse = RTypes.ListDomainsResponse;

type DeleteDomainRequest = RTypes.DeleteDomainRequest;

type DeleteDomainResponse = {
  ref: string;
};

export type {
  Domain,
  CreateDomainRequest,
  CreateDomainResponse,
  UpdateDomainRequest,
  UpdateDomainResponse,
  GetDomainByRefRequest,
  ListDomainsRequest,
  ListDomainsResponse,
  DeleteDomainRequest,
  DeleteDomainResponse
};
