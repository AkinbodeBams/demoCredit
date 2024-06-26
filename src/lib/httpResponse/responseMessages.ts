export enum successResponseMessage {
  DEFAULT = "The request was successful",
}

export enum errorResponseMessage {
  DEFAULT = "An error occurred",
  TOKEN_INVALID = "Token is invalid",
  NO_TOKEN = "No token Provided",
  TOKEN_EXPIRED = "Token has expired",

  ACCOUNT_NOT_FOUND = "Account not found",
  USER_NOT_FOUND = "User not found",

  WITHDRAW_ERROR = "Error withdrawing fund",
  FUND_ERROR = "Error funding account",

  INSUFFICIENT_BALANCE_ERROR = "Insufficient balance",

  TRANSFER_ERROR = "Error transferring funds",
  ACCOUNT_CONFLICT_ERROR = "You cannot transfer funds to account of the same account",
}
