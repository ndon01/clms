import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum OrientationType {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL'
}

export interface Player {
  id: string;
  name: string;
  position: { x: number; y: number };
}

export class Play {
  private _orientation: BehaviorSubject<OrientationType>;
  private _name: BehaviorSubject<string>;
  private _formation: BehaviorSubject<string>;
  private _players: BehaviorSubject<Player[]>;
  private _annotations: BehaviorSubject<string[]>;

  constructor(
    initialOrientation: OrientationType = OrientationType.HORIZONTAL,
    name: string = 'New Play',
    formation: string = '',
    players: Player[] = []
  ) {
    this._orientation = new BehaviorSubject<OrientationType>(initialOrientation);
    this._name = new BehaviorSubject<string>(name);
    this._formation = new BehaviorSubject<string>(formation);
    this._players = new BehaviorSubject<Player[]>(players);
    this._annotations = new BehaviorSubject<string[]>([]);
  }

  // Observable for orientation
  get orientation$(): Observable<OrientationType> {
    return this._orientation.asObservable();
  }

  set orientation(newOrientation: OrientationType) {
    if (this._orientation.getValue() !== newOrientation) {
      this._orientation.next(newOrientation);
    }
  }

  toggleOrientation(): void {
    const currentOrientation = this._orientation.getValue();
    this.orientation = currentOrientation === OrientationType.HORIZONTAL ? OrientationType.VERTICAL : OrientationType.HORIZONTAL;
  }

  // Observable for name
  get name$(): Observable<string> {
    return this._name.asObservable();
  }

  set name(newName: string) {
    if (this._name.getValue() !== newName) {
      this._name.next(newName);
    }
  }

  // Observable for formation
  get formation$(): Observable<string> {
    return this._formation.asObservable();
  }

  set formation(newFormation: string) {
    if (this._formation.getValue() !== newFormation) {
      this._formation.next(newFormation);
    }
  }

  // Observable for players
  get players$(): Observable<Player[]> {
    return this._players.asObservable();
  }

  addPlayer(player: Player): void {
    const players = this._players.getValue();
    this._players.next([...players, player]);
  }

  removePlayer(playerId: string): void {
    const players = this._players.getValue();
    this._players.next(players.filter(player => player.id !== playerId));
  }

  updatePlayerPosition(playerId: string, newPosition: { x: number; y: number }): void {
    const players = this._players.getValue();
    const updatedPlayers = players.map(player => player.id === playerId ? { ...player, position: newPosition } : player);
    this._players.next(updatedPlayers);
  }

  // Observable for annotations
  get annotations$(): Observable<string[]> {
    return this._annotations.asObservable();
  }

  addAnnotation(annotation: string): void {
    const annotations = this._annotations.getValue();
    this._annotations.next([...annotations, annotation]);
  }

  removeAnnotation(annotation: string): void {
    const annotations = this._annotations.getValue();
    this._annotations.next(annotations.filter(ann => ann !== annotation));
  }

  // Serialize the Play instance to a JSON object
  toJSON(): any {
    return {
      orientation: this._orientation.getValue(),
      name: this._name.getValue(),
      formation: this._formation.getValue(),
      players: this._players.getValue(),
      annotations: this._annotations.getValue()
    };
  }

  // Deserialize a JSON object to a Play instance
  static fromJSON(json: any): Play {
    const play = new Play();
    if (json.orientation && (json.orientation === OrientationType.HORIZONTAL || json.orientation === OrientationType.VERTICAL)) {
      play.orientation = json.orientation;
    }
    play.name = json.name || 'New Play';
    play.formation = json.formation || '';
    play._players.next(json.players || []);
    play._annotations.next(json.annotations || []);
    return play;
  }
}
