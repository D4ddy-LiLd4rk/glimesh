import { CustomError } from "./CustomErrors";

/**
 * Thrown whenever you try using invalid values in the client configuration.
 */
export class ConfigError extends CustomError {}