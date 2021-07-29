/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonos
 *
 * This file is part of Project Fonos
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
const GoogleTTS = require("@fonos/googletts");
const {join} = require("path");
const PROJECT_ID = "clever-tube-275321";

// You need to have a set of Google credentials for this to work
function getCredentials() {
  return {
    PROJECT_ID,
    keyFilename: join(__dirname, "../google_credentials.json")
  };
}

module.exports = {
  tts: new GoogleTTS(getCredentials())
};
