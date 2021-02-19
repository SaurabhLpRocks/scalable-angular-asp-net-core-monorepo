import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  // #region Constructors (1)

  constructor(private sanitizer: DomSanitizer) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // #endregion Public Methods (1)
}
