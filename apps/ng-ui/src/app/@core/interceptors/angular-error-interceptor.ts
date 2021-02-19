import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, Type } from '@angular/core';

import { ErrorLoggerService } from '@core/utils/error-logger.service';
import { HotToastService } from '@ngneat/hot-toast';
import { astConstants } from '@shared/constants/ast.constant';
import { AppError } from '@shared/typings/app-error.interface';

@Injectable()
export class AngularErrorInterceptor implements ErrorHandler {
  // #region Constructors (1)

  constructor(
    // Because the ErrorHandler is created before the providers, we'll have to use the Injector to get them.
    private injector: Injector
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      // do nothing as we are handling http errors in http interceptor
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      const errorsService = this.injector.get(
        ErrorLoggerService as Type<ErrorLoggerService>
      );

      void errorsService
        .log(error)
        .then(() => this.showToast(astConstants.defaultJavaScriptError));
    }
  }

  // #endregion Public Methods (1)

  // #region Private Methods (1)

  private showToast(error: AppError): void {
    const toast = this.injector.get(HotToastService as Type<HotToastService>);
    toast.error(`${error.error}! ${error.message}`);
  }

  // #endregion Private Methods (1)
}
