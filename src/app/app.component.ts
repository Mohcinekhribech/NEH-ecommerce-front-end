import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'neh_frontend';
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService , private cd: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
