/**
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
import { LanguageModel } from "../models";
import { Voice } from "../voice";

type AutopilotContext = {
  sessionRef: string;
  languageModel: LanguageModel;
  voice: Voice;
  firstMessage?: string;
  goodbyeMessage: string;
  transferMessage?: string;
  transferPhoneNumber?: string;
  transferTimeout?: number;
  systemErrorMessage: string;
  idleMessage: string;
  idleTimeout: number;
  idleTimeoutCount: number;
  maxIdleTimeoutCount: number;
  maxSpeechWaitTimeout: number;
  speechBuffer: string;
  speechResponseTime: number;
  isSpeaking: boolean;
  knowledgeBaseSourceUrl?: string;
  initialDtmf?: string;
};

type AutopilotEvents =
  | { type: "SPEECH_START" }
  | { type: "SPEECH_END" }
  | { type: "SPEECH_RESULT"; speech: string; responseTime: number };

export { AutopilotContext, AutopilotEvents };
