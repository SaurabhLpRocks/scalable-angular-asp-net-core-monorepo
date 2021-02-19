import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class HelperService {
  // #region Properties (1)

  public env: string;

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor() {
    this.env = environment.env;
  }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public isDevEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'dev' ||
      this.env.toLocaleLowerCase() === 'development'
      ? true
      : false;
  }

  public isProdEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'prod' ||
      this.env.toLocaleLowerCase() === 'production'
      ? true
      : false;
  }

  public isStageEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'stage' ||
      this.env.toLocaleLowerCase() === 'staging'
      ? true
      : false;
  }

  // #endregion Public Methods (3)
}
