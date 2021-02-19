import { astConstants } from '@shared/constants/ast.constant';

export class ParsedCustomServerError {
  // #region Properties (3)

  error?: string | null;
  public message: string | null;
  warning?: string | null;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(error?: string, message?: string) {
    this.error = error || astConstants.defaultServerError.error;
    this.message = message || astConstants.defaultServerError.message;
  }

  // #endregion Constructors (1)
}
