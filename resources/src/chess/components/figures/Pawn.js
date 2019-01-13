export default class Pawn {

  constructor(player, color) {
    this.player = player;
    this.color = color;
    this.figure = 'pawn';
  }

  /**
   * Creates class from local static object
   * @param staticObject
   * @returns {Pawn}
   */
  static createFromStaticObject (staticObject) {
    const toClass = new Pawn(staticObject.player, staticObject.color, staticObject.figure);
    toClass.player = staticObject.player;
    toClass.color = staticObject.color;
    toClass.figure = staticObject.figure;
    return toClass;
  }

  /**
   * Determines whether a move is possible
   * @param currentPosition
   * @param destination
   * @param isDestinationEnemyOccupied
   * @returns {boolean}
   */
  isMovePossible(currentPosition, destination, isDestinationEnemyOccupied) {
    if (this.player === 1) {
      if (!isDestinationEnemyOccupied && currentPosition.index === destination.index) {
        if (
          (parseInt(destination.row) === parseInt(currentPosition.row) - 1) ||
          (parseInt(currentPosition.row) === 6 && parseInt(destination.row) === 6 - 2)
        ) {
          return true
        }
      }
      if(isDestinationEnemyOccupied && parseInt(destination.row) === parseInt(currentPosition.row) - 1) {
        if(
          (parseInt(currentPosition.index) === parseInt(destination.index) - 1) ||
          (parseInt(currentPosition.index) === parseInt(destination.index) + 1)
        ) {
          return true
        }
      }
    }

    if(this.player === 2) {
      if(!isDestinationEnemyOccupied && currentPosition.index === destination.index ) {
        if(
          (parseInt(destination.row) === parseInt(currentPosition.row) + 1) ||
          (parseInt(currentPosition.row) === 1 && parseInt(destination.row) === 1 + 2)
        ) {
          return true
        }
      }

      if(isDestinationEnemyOccupied && parseInt(destination.row) === parseInt(currentPosition.row) + 1) {
        if(
          (parseInt(currentPosition.index) === parseInt(destination.index) - 1) ||
          (parseInt(currentPosition.index) === parseInt(destination.index) + 1)
        ) {
          return true
        }
      }
    }
  }
}
