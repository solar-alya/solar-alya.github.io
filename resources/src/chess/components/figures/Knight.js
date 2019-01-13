export default class Knight {

  constructor(player, color) {
    this.player = player;
    this.color = color;
    this.figure = 'knight';
  }

  /**
   * Creates class from local static object
   * @param staticObject
   * @returns {Pawn}
   */
  static createFromStaticObject (staticObject) {
    const toClass = new Knight(staticObject.player, staticObject.color, staticObject.figure);
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
        if (
          (parseInt(destination.row) === parseInt(currentPosition.row) - 1 && parseInt(currentPosition.index) - 2 === parseInt(destination.index)) ||
          (parseInt(destination.row) === parseInt(currentPosition.row) - 1 && parseInt(currentPosition.index) + 2 === parseInt(destination.index)) ||
          (parseInt(destination.row) === parseInt(currentPosition.row) + 1 && parseInt(currentPosition.index) - 2 === parseInt(destination.index)) ||
          (parseInt(destination.row) === parseInt(currentPosition.row) + 1 && parseInt(currentPosition.index) + 2 === parseInt(destination.index)) ||
          (parseInt(destination.row) === parseInt(currentPosition.row) + 2 && parseInt(currentPosition.index) + 1 === parseInt(destination.index)) ||
          (parseInt(destination.row) === parseInt(currentPosition.row) + 2 && parseInt(currentPosition.index) - 1 === parseInt(destination.index)) ||
          (parseInt(destination.row) === parseInt(currentPosition.row) - 2 && parseInt(currentPosition.index) + 1 === parseInt(destination.index)) ||
          (parseInt(destination.row) === parseInt(currentPosition.row) - 2 && parseInt(currentPosition.index) - 1 === parseInt(destination.index))
        ) {
          return true
        }
    }

    if (this.player === 2) {
      if (
        (parseInt(destination.row) === parseInt(currentPosition.row) + 1 && parseInt(currentPosition.index) + 2 === parseInt(destination.index)) ||
        (parseInt(destination.row) === parseInt(currentPosition.row) + 1 && parseInt(currentPosition.index) - 2 === parseInt(destination.index)) ||
        (parseInt(destination.row) === parseInt(currentPosition.row) - 1 && parseInt(currentPosition.index) + 2 === parseInt(destination.index)) ||
        (parseInt(destination.row) === parseInt(currentPosition.row) - 1 && parseInt(currentPosition.index) - 2 === parseInt(destination.index)) ||
        (parseInt(destination.row) === parseInt(currentPosition.row) - 2 && parseInt(currentPosition.index) - 1 === parseInt(destination.index)) ||
        (parseInt(destination.row) === parseInt(currentPosition.row) - 2 && parseInt(currentPosition.index) + 1 === parseInt(destination.index)) ||
        (parseInt(destination.row) === parseInt(currentPosition.row) + 2 && parseInt(currentPosition.index) - 1 === parseInt(destination.index)) ||
        (parseInt(destination.row) === parseInt(currentPosition.row) + 2 && parseInt(currentPosition.index) + 1 === parseInt(destination.index))
      ) {
        return true
      }
    }
  }
}
