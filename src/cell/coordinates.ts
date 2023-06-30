export class Coordinates {
  private _x: number = 0;
  private _y: number = 0;

  set x(x: number) {
    this._x = x;
  }

  get x() {
    return this._x;
  }

  set y(y: number) {
    this._y = y;
  }

  get y() {
    return this._y;
  }

  constructor(x: number, y: number) {
    this._x = x;
    this.y = y;
  }

  // x and y as "x,y" string
  static fromString(coordinates: string) {
    const [x, y] = coordinates.split(',');
    return new Coordinates(Number(x), Number(y));
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}
