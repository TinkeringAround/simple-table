export class Coordinates {
  private _x: number = 0;
  private _y: number = 0;

  set x(x: number) {
    this._x = x;
  }

  get x(): number {
    return this._x;
  }

  set y(y: number) {
    this._y = y;
  }

  get y(): number {
    return this._y;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // x and y as "x,y" string
  static fromString(coordinates: string): Coordinates {
    const [x, y] = coordinates.split(',');
    return new Coordinates(Number(x), Number(y));
  }

  toString(): string {
    return `${this.x},${this.y}`;
  }
}
