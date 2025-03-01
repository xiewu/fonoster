/*
 * Copyright (C) 2025 by Fonoster Inc (https://fonoster.com)
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
import {
  AllowedHttpMethod,
  EventsHookAllowedEvents,
  eventsHookSchema,
  sendHttpRequest
} from "@fonoster/common";
import { getLogger } from "@fonoster/logger";

const logger = getLogger({ service: "autopilot", filePath: __filename });

type EventsHook = {
  url: string;
  events: EventsHookAllowedEvents[];
  headers?: Record<string, string>;
};

export async function sendConversationEndedEvent(
  eventsHook: EventsHook,
  chatHistory: Record<string, string>[]
) {
  if (
    !eventsHook?.events.includes(EventsHookAllowedEvents.CONVERSATION_ENDED) &&
    !eventsHook?.events.includes(EventsHookAllowedEvents.ALL)
  ) {
    return;
  }

  const parsedEventsHook = eventsHookSchema.parse(eventsHook);
  const body = {
    eventType: EventsHookAllowedEvents.CONVERSATION_ENDED,
    chatHistory
  };

  try {
    await sendHttpRequest({
      url: parsedEventsHook.url!,
      method: AllowedHttpMethod.POST,
      headers: parsedEventsHook.headers,
      waitForResponse: false,
      body
    });
  } catch (e) {
    logger.error("error sending event", e);
  }
}
