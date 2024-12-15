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
const countryIsoCodes = [
  { name: "Afghanistan", value: "AF" },
  { name: "Albania", value: "AL" },
  { name: "Algeria", value: "DZ" },
  { name: "Andorra", value: "AD" },
  { name: "Angola", value: "AO" },
  { name: "Antigua and Barbuda", value: "AG" },
  { name: "Argentina", value: "AR" },
  { name: "Armenia", value: "AM" },
  { name: "Australia", value: "AU" },
  { name: "Austria", value: "AT" },
  { name: "Azerbaijan", value: "AZ" },
  { name: "Bahamas", value: "BS" },
  { name: "Bahrain", value: "BH" },
  { name: "Bangladesh", value: "BD" },
  { name: "Barbados", value: "BB" },
  { name: "Belarus", value: "BY" },
  { name: "Belgium", value: "BE" },
  { name: "Belize", value: "BZ" },
  { name: "Benin", value: "BJ" },
  { name: "Bhutan", value: "BT" },
  { name: "Bolivia", value: "BO" },
  { name: "Bosnia and Herzegovina", value: "BA" },
  { name: "Botswana", value: "BW" },
  { name: "Brazil", value: "BR" },
  { name: "Brunei", value: "BN" },
  { name: "Bulgaria", value: "BG" },
  { name: "Burkina Faso", value: "BF" },
  { name: "Burundi", value: "BI" },
  { name: "Cabo Verde", value: "CV" },
  { name: "Cambodia", value: "KH" },
  { name: "Cameroon", value: "CM" },
  { name: "Canada", value: "CA" },
  { name: "Central African Republic", value: "CF" },
  { name: "Chad", value: "TD" },
  { name: "Chile", value: "CL" },
  { name: "China", value: "CN" },
  { name: "Colombia", value: "CO" },
  { name: "Comoros", value: "KM" },
  { name: "Congo (Congo-Brazzaville)", value: "CG" },
  { name: "Costa Rica", value: "CR" },
  { name: "Croatia", value: "HR" },
  { name: "Cuba", value: "CU" },
  { name: "Cyprus", value: "CY" },
  { name: "Czechia (Czech Republic)", value: "CZ" },
  { name: "Denmark", value: "DK" },
  { name: "Djibouti", value: "DJ" },
  { name: "Dominica", value: "DM" },
  { name: "Dominican Republic", value: "DO" },
  { name: "Ecuador", value: "EC" },
  { name: "Egypt", value: "EG" },
  { name: "El Salvador", value: "SV" },
  { name: "Equatorial Guinea", value: "GQ" },
  { name: "Eritrea", value: "ER" },
  { name: "Estonia", value: "EE" },
  { name: "Eswatini (fmr. 'Swaziland')", value: "SZ" },
  { name: "Ethiopia", value: "ET" },
  { name: "Fiji", value: "FJ" },
  { name: "Finland", value: "FI" },
  { name: "France", value: "FR" },
  { name: "Gabon", value: "GA" },
  { name: "Gambia", value: "GM" },
  { name: "Georgia", value: "GE" },
  { name: "Germany", value: "DE" },
  { name: "Ghana", value: "GH" },
  { name: "Greece", value: "GR" },
  { name: "Grenada", value: "GD" },
  { name: "Guatemala", value: "GT" },
  { name: "Guinea", value: "GN" },
  { name: "Guinea-Bissau", value: "GW" },
  { name: "Guyana", value: "GY" },
  { name: "Haiti", value: "HT" },
  { name: "Honduras", value: "HN" },
  { name: "Hungary", value: "HU" },
  { name: "Iceland", value: "IS" },
  { name: "India", value: "IN" },
  { name: "Indonesia", value: "ID" },
  { name: "Iran", value: "IR" },
  { name: "Iraq", value: "IQ" },
  { name: "Ireland", value: "IE" },
  { name: "Israel", value: "IL" },
  { name: "Italy", value: "IT" },
  { name: "Jamaica", value: "JM" },
  { name: "Japan", value: "JP" },
  { name: "Jordan", value: "JO" },
  { name: "Kazakhstan", value: "KZ" },
  { name: "Kenya", value: "KE" },
  { name: "Kiribati", value: "KI" },
  { name: "Kuwait", value: "KW" },
  { name: "Kyrgyzstan", value: "KG" },
  { name: "Laos", value: "LA" },
  { name: "Latvia", value: "LV" },
  { name: "Lebanon", value: "LB" },
  { name: "Lesotho", value: "LS" },
  { name: "Liberia", value: "LR" },
  { name: "Libya", value: "LY" },
  { name: "Liechtenstein", value: "LI" },
  { name: "Lithuania", value: "LT" },
  { name: "Luxembourg", value: "LU" },
  { name: "Madagascar", value: "MG" },
  { name: "Malawi", value: "MW" },
  { name: "Malaysia", value: "MY" },
  { name: "Maldives", value: "MV" },
  { name: "Mali", value: "ML" },
  { name: "Malta", value: "MT" },
  { name: "Marshall Islands", value: "MH" },
  { name: "Mauritania", value: "MR" },
  { name: "Mauritius", value: "MU" },
  { name: "Mexico", value: "MX" },
  { name: "Micronesia", value: "FM" },
  { name: "Moldova", value: "MD" },
  { name: "Monaco", value: "MC" },
  { name: "Mongolia", value: "MN" },
  { name: "Montenegro", value: "ME" },
  { name: "Morocco", value: "MA" },
  { name: "Mozambique", value: "MZ" },
  { name: "Myanmar (formerly Burma)", value: "MM" },
  { name: "Namibia", value: "NA" },
  { name: "Nauru", value: "NR" },
  { name: "Nepal", value: "NP" },
  { name: "Netherlands", value: "NL" },
  { name: "New Zealand", value: "NZ" },
  { name: "Nicaragua", value: "NI" },
  { name: "Niger", value: "NE" },
  { name: "Nigeria", value: "NG" },
  { name: "North Korea", value: "KP" },
  { name: "North Macedonia", value: "MK" },
  { name: "Norway", value: "NO" },
  { name: "Oman", value: "OM" },
  { name: "Pakistan", value: "PK" },
  { name: "Palau", value: "PW" },
  { name: "Palestine State", value: "PS" },
  { name: "Panama", value: "PA" },
  { name: "Papua New Guinea", value: "PG" },
  { name: "Paraguay", value: "PY" },
  { name: "Peru", value: "PE" },
  { name: "Philippines", value: "PH" },
  { name: "Poland", value: "PL" },
  { name: "Portugal", value: "PT" },
  { name: "Qatar", value: "QA" },
  { name: "Romania", value: "RO" },
  { name: "Russia", value: "RU" },
  { name: "Rwanda", value: "RW" },
  { name: "Saint Kitts and Nevis", value: "KN" },
  { name: "Saint Lucia", value: "LC" },
  { name: "Saint Vincent and the Grenadines", value: "VC" },
  { name: "Samoa", value: "WS" },
  { name: "San Marino", value: "SM" },
  { name: "Sao Tome and Principe", value: "ST" },
  { name: "Saudi Arabia", value: "SA" },
  { name: "Senegal", value: "SN" },
  { name: "Serbia", value: "RS" },
  { name: "Seychelles", value: "SC" },
  { name: "Sierra Leone", value: "SL" },
  { name: "Singapore", value: "SG" },
  { name: "Slovakia", value: "SK" },
  { name: "Slovenia", value: "SI" },
  { name: "Solomon Islands", value: "SB" },
  { name: "Somalia", value: "SO" },
  { name: "South Africa", value: "ZA" },
  { name: "South Korea", value: "KR" },
  { name: "South Sudan", value: "SS" },
  { name: "Spain", value: "ES" },
  { name: "Sri Lanka", value: "LK" },
  { name: "Sudan", value: "SD" },
  { name: "Suriname", value: "SR" },
  { name: "Sweden", value: "SE" },
  { name: "Switzerland", value: "CH" },
  { name: "Syria", value: "SY" },
  { name: "Tajikistan", value: "TJ" },
  { name: "Tanzania", value: "TZ" },
  { name: "Thailand", value: "TH" },
  { name: "Timor-Leste", value: "TL" },
  { name: "Togo", value: "TG" },
  { name: "Tonga", value: "TO" },
  { name: "Trinidad and Tobago", value: "TT" },
  { name: "Tunisia", value: "TN" },
  { name: "Turkey", value: "TR" },
  { name: "Turkmenistan", value: "TM" },
  { name: "Tuvalu", value: "TV" },
  { name: "Uganda", value: "UG" },
  { name: "Ukraine", value: "UA" },
  { name: "United Arab Emirates", value: "AE" },
  { name: "United Kingdom", value: "GB" },
  { name: "United States", value: "US" },
  { name: "Uruguay", value: "UY" },
  { name: "Uzbekistan", value: "UZ" },
  { name: "Vanuatu", value: "VU" },
  { name: "Vatican City", value: "VA" },
  { name: "Venezuela", value: "VE" },
  { name: "Vietnam", value: "VN" },
  { name: "Yemen", value: "YE" },
  { name: "Zambia", value: "ZM" },
  { name: "Zimbabwe", value: "ZW" },
];

export { countryIsoCodes };
