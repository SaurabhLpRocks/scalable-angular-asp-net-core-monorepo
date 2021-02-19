import { CommonModule } from '@angular/common';
import {
    ModuleWithProviders, NgModule, Optional, SkipSelf
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotToastModule } from '@ngneat/hot-toast';
import { InspectorModule } from '@ngneat/inspector';
import { HelperService } from '@shared/services/helper.service';
import { environment } from '../../environments/environment';
import {
    FooterComponent, HeaderComponent, SidebarComponent, SpinnerComponent
} from './components';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { httpInterceptorProviders } from './interceptors/index';
import { ErrorLoggerService, HttpErrorHandlerService } from './utils';

const THIRD_PARTY_MODULES = [
  HotToastModule.forRoot(),
  environment.production ? [] : InspectorModule.forRoot(),
];

const COMPONENTS = [
  FooterComponent,
  HeaderComponent,
  SidebarComponent,
  SpinnerComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, ...THIRD_PARTY_MODULES],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [
    HelperService,
    ...httpInterceptorProviders,
    ErrorLoggerService,
    HttpErrorHandlerService,
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // #region Constructors (1)

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

  // #endregion Constructors (1)

  // #region Public Static Methods (1)

  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }

  // #endregion Public Static Methods (1)
}
