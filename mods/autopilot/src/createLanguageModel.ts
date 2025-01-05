// @ts-nocheck - All inputs are validated by the APIServer
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
  AssistantConfig,
  KnowledgeBase,
  LanguageModelFactory,
  TelephonyContext,
  Voice,
  hangupToolDefinition,
  transferToolDefinition
} from ".";

function createLanguageModel(params: {
  voice: Voice;
  assistantConfig: AssistantConfig;
  knowledgeBase: KnowledgeBase;
  telephonyContext: TelephonyContext;
}) {
  const { voice, assistantConfig, knowledgeBase, telephonyContext } = params;
  const { languageModel: languageModelSettings, conversationSettings } =
    assistantConfig;

  // Ensure that the transfer tool is only added if the transfer options exist
  const tools = languageModelSettings.tools.concat(
    assistantConfig.conversationSettings.transferOptions
      ? [hangupToolDefinition, transferToolDefinition]
      : [hangupToolDefinition]
  );

  return LanguageModelFactory.getLanguageModel(
    languageModelSettings.provider,
    {
      model: languageModelSettings.model,
      apiKey: languageModelSettings.apiKey,
      maxTokens: languageModelSettings.maxTokens,
      temperature: languageModelSettings.temperature,
      firstMessage: conversationSettings.firstMessage,
      systemTemplate: conversationSettings.systemTemplate,
      baseUrl: languageModelSettings.baseUrl,
      knowledgeBase,
      tools
    },
    voice,
    telephonyContext
  );
}

export { createLanguageModel };
