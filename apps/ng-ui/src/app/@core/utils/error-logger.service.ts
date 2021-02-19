
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, Type } from '@angular/core';
import { Router } from '@angular/router';
import { appApiResources } from '@shared/constants';
import { HelperService } from '@shared/services';
import { User } from '@shared/typings';
import { ParsedError } from '../interceptors/parsed-error.interface';



@Injectable()
export class ErrorLoggerService {
  constructor(private injector: Injector, private http: HttpClient) { }
  async log(error: Error): Promise<ParsedError> {
    // const parsedStackInfo = await this.parseErrorStack(error);
    const parsedError = this.addContextInfo(error);

    this.logToConsole(error, parsedError);

    if (appApiResources.logError) {
      // Send error to server
      await this.http.post<ParsedError>(appApiResources.logError, parsedError).toPromise();
      return parsedError;
    } else {
      // API to log error not available
      await new Promise<ParsedError>((resolve) => {
        setTimeout(() => {
          resolve(parsedError);
        }, 0);
      });
      return parsedError;
    }
  }

  // eslint-disable-next-line max-lines-per-function
  addContextInfo(error: Error): ParsedError {
    // All the context details that you want (usually coming from other services; Constants, UserService...)
    const errorName: string | null = error.name || null;
    const appId = '';
    const userLs: string | null = localStorage.getItem('user');
    let user: User = {};
    if (userLs) {
      user = JSON.parse(userLs) as User;
    }
    const { id, email, name } = user || { id: '', email: '', name: '' };
    const timeInEpochMilliseconds = Date.now();

    const router = this.injector.get(Router as Type<Router>);
    const angularRoute = router.url;

    const message: string = error.message || error.toString();
    const stackFrames = JSON.stringify(error.stack);

    return {
      errorName,
      appId,
      name,
      email,
      id,
      timeInEpochMilliseconds,
      angularRoute,
      message,
      stackFrames,
      // parsedStackInfo,
      originalErrorStack: JSON.stringify(error.stack),
    };
  }


  private logToConsole(error: Error, parsedError: ParsedError) {
    const helperService = this.injector.get(HelperService as Type<HelperService>);
    if (helperService.isDevEnv()) {
      console.error('🚀 ~ file: error-logger.service.ts ~ line 79 ~ ErrorLoggerService ~ logToConsole ~ Original Error: ', error);
      console.error('🚀 ~ file: error-logger.service.ts ~ line 79 ~ ErrorLoggerService ~ logToConsole ~ Parsed Error: ', parsedError);
    } else {
      console.log(error)
    }
  }
}
