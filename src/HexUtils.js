import Hex from './models/Hex';
import Point from './models/Point';

class HexUtils {
  constructor () {
    this.DIRECTIONS = [
      new Hex( 1, 0, -1 ),
      new Hex( 1, -1, 0 ),
      new Hex( 0, -1, 1 ),
      new Hex( -1, 0, 1 ),
      new Hex( -1, 1, 0 ),
      new Hex( 0, 1, -1 ),
    ];

    this.equals = function ( a, b ) {
      return a.q === b.q && a.r === b.r && a.s === b.s;
    };

    this.add = function ( a, b ) {
      return new Hex( a.q + b.q, a.r + b.r, a.s + b.s );
    };

    this.subtract = function ( a, b ) {
      return new Hex( a.q - b.q, a.r - b.r, a.s - b.s );
    };

    this.multiply = function ( a, k ) {
      return new Hex( a.q * k, a.r * k, a.s * k );
    };

    this.lengths = function ( hex ) {
      // @ts-ignore
      return parseInt(
        // @ts-ignore
        ( Math.abs( hex.q ) + Math.abs( hex.r ) + Math.abs( hex.s ) ) / 2
      );
    };

    this.distance = function ( a, b ) {
      return this.lengths( this.subtract( a, b ) );
    };

    this.direction = function ( direction ) {
      return this.DIRECTIONS[ ( 6 + ( direction % 6 ) ) % 6 ];
    };

    this.neighbour = function ( hex, direction ) {
      return this.add( hex, this.direction( direction ) );
    };

    this.neighbours = function ( hex ) {
      const array = [];
      for ( let i = 0; i < this.DIRECTIONS.length; i += 1 ) {
        array.push( this.neighbour( hex, i ) );
      }

      return array;
    };

    this.round = function ( hex ) {
      let rq = Math.round( hex.q );
      let rr = Math.round( hex.r );
      let rs = Math.round( hex.s );

      const qDiff = Math.abs( rq - hex.q );
      const rDiff = Math.abs( rr - hex.r );
      const sDiff = Math.abs( rs - hex.s );

      if ( qDiff > rDiff && qDiff > sDiff ) {
        rq = -rr - rs;
      } else if ( rDiff > sDiff ) {
        rr = -rq - rs;
      } else {
        rs = -rq - rr;
      }

      return new Hex( rq, rr, rs );
    };

    this.hexToPixel = function ( hex, layout ) {
      const s = layout.spacing;
      const M = layout.orientation;
      let x = ( M.f0 * hex.q + M.f1 * hex.r ) * layout.size.x;
      let y = ( M.f2 * hex.q + M.f3 * hex.r ) * layout.size.y;
      // Apply spacing
      x = x * s;
      y = y * s;
      return new Point( x + layout.origin.x, y + layout.origin.y );
    };

    this.pixelToHex = function ( point, layout ) {
      const M = layout.orientation;
      const pt = new Point(
        ( point.x - layout.origin.x ) / layout.size.x,
        ( point.y - layout.origin.y ) / layout.size.y
      );
      const q = M.b0 * pt.x + M.b1 * pt.y;
      const r = M.b2 * pt.x + M.b3 * pt.y;
      const hex = new Hex( q, r, -q - r );
      return this.round( hex );
    };

    this.lerp = function ( a, b, t ) {
      return a + ( b - a ) * t;
    };

    this.hexLerp = function ( a, b, t ) {
      return new Hex(
        this.lerp( a.q, b.q, t ),
        this.lerp( a.r, b.r, t ),
        this.lerp( a.s, b.s, t )
      );
    };

    this.getID = function ( hex ) {
      return `${ hex.q },${ hex.r },${ hex.s }`;
    };
  }
}

export default new HexUtils();
