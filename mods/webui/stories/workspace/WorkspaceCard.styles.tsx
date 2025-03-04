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
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export const StyledCard = styled(Card)<{
  disabled: boolean;
  workspaceVariant?: string;
}>(({ disabled, workspaceVariant }) => ({
  height: "325px",
  backgroundColor:
    workspaceVariant === "regular" ? "rgba(244, 244, 244, 1)" : "#ffffff",
  cursor: disabled ? "not-allowed" : "pointer",
  borderRadius: "10px",
  border: disabled
    ? "1px solid rgba(232, 232, 232, 1)"
    : "1px solid rgba(57, 225, 158, 1)",
  padding: "30px 30px 16px 30px"
}));

export const StyledCardContentContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%"
}));

export const StyledNewWorkSpaceDescription = styled(Typography)<{
  disabled: boolean;
}>(({ disabled }) => ({
  fontFamily: "Poppins",
  fontSize: "21px",
  fontWeight: 600,
  lineHeight: "31.5px",
  letterSpacing: "0.5px",
  textAlign: "center",
  textUnderlinePosition: "from-font",
  textDecorationSkipInk: "none",
  color: disabled ? "rgba(194, 194, 194, 1)" : "rgba(0, 135, 81, 1)"
}));

export const StyledAddIconContainer = styled("div")<{
  disabled: boolean;
}>(({ disabled }) => ({
  color: disabled ? "rgba(194, 194, 194, 1)" : "rgba(0, 135, 81, 1)",
  "& svg": {
    width: "40px",
    height: "40px"
  }
}));

export const StyledDescription = styled(Typography)(() => ({
  fontFamily: "Poppins",
  fontSize: "21px",
  fontWeight: 600,
  lineHeight: "31.5px",
  letterSpacing: "0.5px",
  textAlign: "left",
  textUnderlinePosition: "from-font",
  textDecorationSkipInk: "none",
  color: "#333333"
}));

export const StyledBottomContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "24px"
}));

export const StyledDateContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "7.5px"
}));

export const StyledDate = styled(Typography)(() => ({
  fontFamily: "Roboto Mono",
  color: "rgba(85, 85, 85, 1)",
  fontSize: "10px",
  fontWeight: 700,
  lineHeight: "21px",
  letterSpacing: "0.5px",
  textAlign: "left",
  textUnderlinePosition: "from-font",
  textDecorationSkipInk: "none"
}));

export const StyledIcon = styled("div")(() => ({
  color: "rgba(51, 51, 51, 1)",
  display: "flex",
  alignItems: "center",
  "& svg": {
    width: "16px",
    height: "16px"
  }
}));
