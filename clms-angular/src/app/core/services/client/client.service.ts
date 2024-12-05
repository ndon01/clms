import {Injectable, OnInit, WritableSignal} from '@angular/core';
import {User, UserProjection} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";
import {ClientDataSourceService} from "@core/services/client-data-source.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";

export type INullish = undefined | null

export type IAppClient = {
  clientId: number | INullish,
}

@Injectable({
  providedIn: 'root'
})
export class ClientService implements OnInit {
  private user: UserProjection | null = null;
  private authenticated: boolean = false;

  private clientPermissions: Map<string, boolean> = new Map();

  constructor(private httpClient: HttpClient, private clientDataSourceService: ClientDataSourceService, private router: Router){
  }

  ngOnInit() {
    this.clientDataSourceService.get().subscribe(data => {
      if(data == null) {
        this.authenticated = false;
        this.user = null;
        return;
      }

      this.authenticated = true;
      this.user = data;
      this.buildPermissionList();
    })
  }

  public getUser(): UserProjection | null {
    return this.user;
  }


  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public logout() {
    localStorage.removeItem("client_data")
    this.httpClient.post('/api/auth/logout', {}).subscribe(() => {
      this.clientDataSourceService.refresh();
    }).add(()=>{
      this.router.navigate(['/public/landing'])

    })


  }

  public hasPermission(permissionName: string) {
    console.log(this.clientPermissions)

    return this.clientPermissions.has(permissionName.toLowerCase());
  }

  private buildPermissionList() {
    // from permissions
    this.user?.permissions?.forEach(permission => {
      if (permission == null || permission.name == null) {
        return;
      }
      this.clientPermissions.set(permission.name, true)
    })
    // from roles
    this.user?.roles?.forEach(role => {
      role.permissions?.forEach(permission => {
        if (permission == null || permission.name == null) {
          return;
        }

        this.clientPermissions.set(permission.name, true)
      })
    })

  }
}
