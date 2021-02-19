import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  // #region Properties (1)

  public title = 'Dashboard Component';

  // #endregion Properties (1)

  // #region Public Methods (1)

  public ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('DashboardComponent: ngOnInit');
    throw new Error('Test Error');
  }

  // #endregion Public Methods (1)
}
