import { Injectable, WritableSignal } from '@angular/core';

export type INullish = undefined | null

export type IAppClient = {
  clientId: number | INullish,
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _appClient: WritableSignal<Partial<IAppClient>> | undefined;

  constructor() {}

  updateAppClient(newAppClient: Partial<IAppClient>) {
    // TODO: figure out a system for handling changes
    this._appClient?.update(oldAppClient => newAppClient)
  }



}
