import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { appApiResources } from '@shared/constants/api-resources.constant';
import { astConstants } from '@shared/constants/ast.constant';
import { HelperService } from '@shared/services/helper.service';
import { ServerResponse } from '@shared/typings/server-response.interface';
import { Observable, throwError } from 'rxjs';
import {
    ParsedCustomServerError
} from '../parsed-custom-server-error.interface';

@Injectable()
export class HttpErrorHandlerService {
  // #region Properties (3)

  // TypeScript's Type-Guard
  private isCustomApiError = (
    error: ParsedCustomServerError | string
  ): error is ParsedCustomServerError => typeof error === 'object';

  private parseCustomServerError = (
    error: ServerResponse | null
  ): ParsedCustomServerError => ({
    error:
      (error?.error || error?.errorCode) && !error.warning
        ? error.error || error.errorCode
        : null,
    warning: error?.warning ? error.warning : null,
    message: error?.message || astConstants.defaultServerError.message,
  });

  private userOfflineError = (): ParsedCustomServerError =>
    new ParsedCustomServerError(
      astConstants.defaultNetworkError.error,
      astConstants.defaultNetworkError.message
    );

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(public helperService: HelperService) {}

  // #endregion Constructors (1)

  // #region Public Methods (2)

  /**
   * This method parses custom server error from http interceptor
   * to more useful & readable format.
   * @date 2020-11-15
   * @param errorRes
   * @returns
   * @memberof HttpErrorHandlerService
   */
  public handleCustomServerError(
    errorRes: HttpResponse<ServerResponse>
  ): HttpResponse<ServerResponse> | Observable<never> {
    const error = errorRes.body;

    const parsedCustomServerError = this.parseCustomServerError(error);

    this.showToast(parsedCustomServerError);
    // Don't throw error for the warning
    this.logErrorToConsoleForDevEnv(errorRes, parsedCustomServerError);

    return error?.warning && !error.error
      ? errorRes
      : throwError(parsedCustomServerError.message);
  }

  /**
   * Handles the error response when the API returns error status code i.e. non 200 status code.
   * @param error
   * @returns
   * @memberof ErrorHandlerService
   */
  public handleErrorResponse(error: HttpErrorResponse): Observable<never> {
    const parsedError = this.tryParseError(error.error);
    if (!this.isErrorForAuth(error)) {
      this.showToast(parsedError);
    }

    return throwError(parsedError.error);
  }

  // #endregion Public Methods (2)

  // #region Private Methods (4)

  private isErrorForAuth(error: HttpErrorResponse): boolean {
    return error.message.includes(appApiResources.login);
  }

  private logErrorToConsoleForDevEnv(
    errorRes: HttpResponse<ServerResponse>,
    parsedError: ParsedCustomServerError
  ) {
    if (this.helperService.isDevEnv()) {
      console.error(
        'Url:',
        errorRes.url,
        'Parsed Error:',
        parsedError,
        'Error Response: ',
        errorRes
      );
    }
  }

  private showToast(parsedError: ParsedCustomServerError): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const title =
      parsedError.error ||
      parsedError.warning ||
      astConstants.defaultServerError.error;
    if (parsedError.message !== 'Unknown error occurred! Please try again.') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const message = parsedError.message;
      // parsedError.warning ? this.toast.onWarning(title, message) : this.toast.onError(title, message);
    }
  }

  private tryParseError(
    error: ParsedCustomServerError | string
  ): ParsedCustomServerError {
    try {
      if (this.isCustomApiError(error)) {
        return {
          error:
            error.error ||
            error.warning ||
            astConstants.defaultServerError.error,
          message: error.message || astConstants.defaultServerError.message,
        };
      }
    } catch (ex) {
      return new ParsedCustomServerError();
    }
    if (navigator.onLine) {
      return new ParsedCustomServerError();
    } else {
      return this.userOfflineError();
    }
  }

  // #endregion Private Methods (4)
}
