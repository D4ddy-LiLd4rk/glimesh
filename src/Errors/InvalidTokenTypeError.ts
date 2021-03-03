import { CustomError } from "./CustomErrors";

/**
 * Thrown whenever a different token type (user vs. app) is expected in the method you're calling.
 */
export class InvalidTokenTypeError extends CustomError {}