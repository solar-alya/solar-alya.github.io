import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pawn from './figures/Pawn';
import PawnIcon from './figures/PawnIcon';
import Knight from './figures/Knight';
import KnightIcon from './figures/KnightIcon';
import {
  setSquares,
  setNewSquares,
  saveGame,
  resetGame,
  loadGame,
  pushToCaptivity
} from "../actions";

import "../assets/App.scss";

/**
 * Function to determine the enemy
 * @param destination
 * @param currentPosition
 * @returns {boolean}
 */
function isDestEnemyOccupied(destination, currentPosition) {
  return destination[0].figure === undefined ?  false : destination[0].player !== currentPosition[0].player;
}

class App extends React.Component {
  static propTypes = {
    setSquares: PropTypes.func.isRequired,
    setNewSquares: PropTypes.func.isRequired,
    saveGame: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
    loadGame: PropTypes.func.isRequired,
    pushToCaptivity: PropTypes.func.isRequired,
    player: PropTypes.number.isRequired,
    whiteCaptives: PropTypes.arrayOf(PropTypes.string),
    blackCaptives: PropTypes.arrayOf(PropTypes.string)
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: null,
      destination: null
    };
  }

  componentDidMount() {
    this.props.setSquares();
  }

  /**
   * function for move
   */
  move = () => {
    const newSquares = this.props.squares;
    if(this.state.currentPosition !== null && this.state.destination !== null && this.props.player === this.props.squares[this.state.currentPosition.row][this.state.currentPosition.index][0].player) {
      const currentSquare = this.props.squares[this.state.currentPosition.row][this.state.currentPosition.index];
      const destinationSquare = this.props.squares[this.state.destination.row][this.state.destination.index];
      if(isDestEnemyOccupied(destinationSquare, currentSquare) &&
        currentSquare[0].isMovePossible(
          this.state.currentPosition,
          this.state.destination,
          isDestEnemyOccupied(destinationSquare, currentSquare)) ) {
        this.props.pushToCaptivity(newSquares[this.state.destination.row][this.state.destination.index][0].figure)
      }
      if(currentSquare[0]
        .isMovePossible(
          this.state.currentPosition,
          this.state.destination,
          isDestEnemyOccupied(destinationSquare, currentSquare)))
      {
        if(currentSquare[0].figure === 'pawn'){
          newSquares[this.state.destination.row][this.state.destination.index][0] = new Pawn(currentSquare[0].player, currentSquare[0].color);
        }
        if(currentSquare[0].figure === 'knight'){
          newSquares[this.state.destination.row][this.state.destination.index][0] = new Knight(currentSquare[0].player, currentSquare[0].color);
        }
        newSquares[this.state.currentPosition.row][this.state.currentPosition.index][0] = {};
        this.props.setNewSquares(newSquares);

        currentSquare[1].cellColor = currentSquare[1].cellColor.replace(/active-cell/g, '');

        this.setState({
          currentPosition: null,
          destination: null,
        });
      }
    }

    if(this.props.player !== this.props.squares[this.state.currentPosition.row][this.state.currentPosition.index][0].player){
      this.setState({
        currentPosition: null,
        destination: null,
      });
    }
  };

  /**
   * Listener for free cells
   * @param row
   * @param index
   */
  onClickEmpty = (row, index) => {
    if(this.state.currentPosition !== null) {
      this.setState({
        destination: {row,index},
      }, () => {
        this.move();
      });
    }

  };

  /**
   * Listener for occupied cells
   * @param row
   * @param index
   */
  onClickFigure = (row, index) => {

    if(this.props.squares[row][index][0].figure !== undefined && this.state.currentPosition === null ||
      this.props.squares[row][index][0].figure !== undefined &&
      this.props.squares[row][index][0].player === this.props.squares[this.state.currentPosition.row][this.state.currentPosition.index][0].player
    ) {
      if(this.props.squares[row][index][0].player === this.props.player) {
        this.props.squares[row][index][1].cellColor = this.props.squares[row][index][1].cellColor + ' active-cell';

        if(this.state.currentPosition !== null &&
          this.props.squares[this.state.currentPosition.row][this.state.currentPosition.index][0].player === this.props.player
        ){
          this.props.squares[this.state.currentPosition.row][this.state.currentPosition.index][1].cellColor = this.props.squares[this.state.currentPosition.row][this.state.currentPosition.index][1].cellColor.replace(/active-cell/g, '');
        }

        this.setState({
          currentPosition: {row,index},
        });
      }
    }

    if(this.state.currentPosition !== null &&
      this.props.squares[row][index][0].player !== this.props.squares[this.state.currentPosition.row][this.state.currentPosition.index][0].player
    ) {
      this.setState({
        destination: {row,index},
      }, () => {
        this.move();
      });
    }
  };
  /**
   * Listener for save button
   */
  handleSave = () => {
    this.props.saveGame();
  };

  /**
   * Listener for reset button
   */
  handleReset = () => {
    this.props.resetGame();
  };
  /**
   * Listener for load button
   */
  handleLoad = () => {
    this.props.loadGame();
  };

  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <div className="header__inner">
            <a href="/" className="header__inner__logo">
              Solar Chess
            </a>
          </div>
          <div className="action_buttons">
            <button
              className="new_game"
              onClick={this.handleReset}
            >
              Start new game
            </button>
            <button
              className="load_game"
              onClick={this.handleLoad}
            >
              Load previous game
            </button>
            <button
              className="save_game"
              onClick={this.handleSave}
            >
              Save game
            </button>
          </div>
        </div>
        <div className="inner">
          <div className="info info-white">
            <h1>
              <div>White</div>
              {
                this.props.player === 1 &&
                <div className='info_active'>&nbsp;is active player</div>
              }
            </h1>

            {
              this.props.whiteCaptives.length !== 0 &&
                <div className="info_captives">
                  {
                    this.props.whiteCaptives.map((item, index) => (
                      <div key={item+index+'white'}>
                        {
                          item === 'pawn'?
                            <PawnIcon color={'#000'} />:
                            item === 'knight' ? <KnightIcon color={'#000'} /> :''
                        }
                      </div>
                    ))
                  }
                </div>
            }

          </div>
          <div className='board'>
              {
                _.map(this.props.squares, (item, index) => (
                <div className="row" key={index}>
                  {
                    item.map((it, ind) => (
                    <button
                      key={it[1].item}
                      className={it[1].cellColor}
                      onClick={
                        it[0].figure === undefined ?
                          () => this.onClickEmpty(index, ind) :
                          () => this.onClickFigure(index, ind)
                      }
                    >
                      {
                        it[0].figure === undefined ? '' :
                          it[0].figure === 'pawn' ?
                            <PawnIcon color={it[0].color}/> :
                            it[0].figure === 'knight'? <KnightIcon color={it[0].color}/>:''
                      }
                    </button>
                    ))
                  }
                </div>
                ))
              }
          </div>
          <div className="info info-black">
            <h1>
              <div>Black</div>
              {
                this.props.player === 2 &&
                <div className='info_active'>&nbsp;is active player</div>
              }
            </h1>

            {
              this.props.blackCaptives.length !== 0 &&
              <div className="info_captives">
                {
                  this.props.blackCaptives.map((item, index) => (
                    <div key={item+index+'black'}>
                      {
                        item === 'pawn'?
                          <PawnIcon color={'#fff'} />:
                          item === 'knight' ? <KnightIcon color={'#fff'} /> :''
                      }
                    </div>
                  ))
                }
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    squares: state.chess.squares,
    player: state.chess.player,
    whiteCaptives: state.chess.whiteCaptives,
    blackCaptives: state.chess.blackCaptives
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSquares(squares) {
      dispatch(setSquares(squares));
    },
    setNewSquares(squares) {
      dispatch(setNewSquares(squares));
    },
    saveGame() {
      dispatch(saveGame());
    },
    resetGame() {
      dispatch(resetGame());
    },
    loadGame() {
      dispatch(loadGame());
    },
    pushToCaptivity(figure) {
      dispatch(pushToCaptivity(figure));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
