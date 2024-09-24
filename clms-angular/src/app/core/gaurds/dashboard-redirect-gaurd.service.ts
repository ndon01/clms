import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {ClientService} from "@core/services/client/client.service";
import {ClientDataSourceService} from "@core/services/client-data-source.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root',
})
export class DashboardRedirectGaurdService implements CanActivate {

  private isLoggedIn: boolean = false;

  constructor(private clientDataSourceService: ClientDataSourceService, private router: Router) {
    this.clientDataSourceService.get().pipe(takeUntilDestroyed()).subscribe(client => {
      if (client) {
        this.isLoggedIn = true;
      }
    })
  }

  canActivate(): boolean {
    if (this.isLoggedIn) {
      this.router.navigate(['dashboard']);  // Redirect to dashboard if logged
      return false;  // Block access
    } else {
      return true;  // Block access
    }
  }
}
