import { useState, useEffect, useCallback } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { BsArrowLeftCircle, BsArrowRightCircle, BsArrowDownCircle, BsArrowClockwise } from 'react-icons/bs';
import { useLanguage } from '../../context/LanguageContext';

interface TetrisProps {
  onClose: () => void;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 1000;

const TETROMINOS = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: '#00f0f0'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#f0f000'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: '#a000f0'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: '#f0a000'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: '#0000f0'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: '#00f000'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: '#f00000'
  }
};

const Tetris = ({ onClose }: TetrisProps) => {
  const { language } = useLanguage();
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentPiece, setCurrentPiece] = useState(getRandomPiece());
  const [nextPiece, setNextPiece] = useState(getRandomPiece());
  const [position, setPosition] = useState({ x: 4, y: 0 });

  function createEmptyBoard() {
    return Array.from({ length: BOARD_HEIGHT }, () =>
      Array(BOARD_WIDTH).fill(null)
    );
  }

  function getRandomPiece() {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof TETROMINOS;
    return {
      shape: TETROMINOS[randomPiece].shape,
      color: TETROMINOS[randomPiece].color
    };
  }

  const moveDown = useCallback(() => {
    if (!isColliding(position.x, position.y + 1)) {
      setPosition(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      mergePiece();
      clearLines();
      if (position.y === 0) {
        setGameOver(true);
      } else {
        setCurrentPiece(nextPiece);
        setNextPiece(getRandomPiece());
        setPosition({ x: 4, y: 0 });
      }
    }
  }, [position, currentPiece, board, nextPiece]);

  function isColliding(newX: number, newY: number) {
    return currentPiece.shape.some((row, y) =>
      row.some((cell, x) => {
        if (cell === 0) return false;
        const boardX = newX + x;
        const boardY = newY + y;
        return (
          boardX < 0 ||
          boardX >= BOARD_WIDTH ||
          boardY >= BOARD_HEIGHT ||
          (boardY >= 0 && board[boardY][boardX] !== null)
        );
      })
    );
  }

  function mergePiece() {
    const newBoard = [...board];
    currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      });
    });
    setBoard(newBoard);
  }

  function clearLines() {
    const newBoard = board.filter(row => row.some(cell => cell === null));
    const clearedLines = BOARD_HEIGHT - newBoard.length;
    const newScore = score + (clearedLines * 100);
    setScore(newScore);
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
    }
    
    setBoard(newBoard);
    return newBoard;
  }

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(moveDown, INITIAL_SPEED);
      return () => clearInterval(interval);
    }
  }, [moveDown, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowLeft':
          if (!isColliding(position.x - 1, position.y)) {
            setPosition(prev => ({ ...prev, x: prev.x - 1 }));
          }
          break;
        case 'ArrowRight':
          if (!isColliding(position.x + 1, position.y)) {
            setPosition(prev => ({ ...prev, x: prev.x + 1 }));
          }
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          // Rotation
          const rotatedShape = currentPiece.shape[0].map((_, i) =>
            currentPiece.shape.map(row => row[i]).reverse()
          );
          const newPiece = { ...currentPiece, shape: rotatedShape };
          setCurrentPiece(newPiece);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [position, currentPiece, gameOver, moveDown]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const renderNextPiece = () => {
    const gridSize = 4;
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
    const offsetX = Math.floor((gridSize - nextPiece.shape[0].length) / 2);
    const offsetY = Math.floor((gridSize - nextPiece.shape.length) / 2);

    nextPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          grid[y + offsetY][x + offsetX] = nextPiece.color;
        }
      });
    });

    return (
      <div className="grid gap-px" style={{ 
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        width: `${gridSize * 20}px`
      }}>
        {grid.map((row, y) => 
          row.map((cell, x) => (
            <div
              key={`next-${y}-${x}`}
              className="w-5 h-5 border border-[#1e1e1e]"
              style={{ 
                backgroundColor: cell || '#121212',
                transition: 'background-color 0.1s'
              }}
            />
          ))
        )}
      </div>
    );
  };

  // Contrôles tactiles
  const renderMobileControls = () => (
    <div className="mt-4 grid grid-cols-3 gap-4 md:hidden">
      <button
        onClick={() => {
          if (!isColliding(position.x - 1, position.y)) {
            setPosition(prev => ({ ...prev, x: prev.x - 1 }));
          }
        }}
        className="p-4 bg-[#1e1e1e] rounded flex items-center justify-center"
      >
        <BsArrowLeftCircle className="text-2xl text-white" />
      </button>
      <button
        onClick={moveDown}
        className="p-4 bg-[#1e1e1e] rounded flex items-center justify-center"
      >
        <BsArrowDownCircle className="text-2xl text-white" />
      </button>
      <button
        onClick={() => {
          if (!isColliding(position.x + 1, position.y)) {
            setPosition(prev => ({ ...prev, x: prev.x + 1 }));
          }
        }}
        className="p-4 bg-[#1e1e1e] rounded flex items-center justify-center"
      >
        <BsArrowRightCircle className="text-2xl text-white" />
      </button>
      <div className="col-span-3 flex justify-center">
        <button
          onClick={() => {
            const rotatedShape = currentPiece.shape[0].map((_, i) =>
              currentPiece.shape.map(row => row[i]).reverse()
            );
            const newPiece = { ...currentPiece, shape: rotatedShape };
            setCurrentPiece(newPiece);
          }}
          className="p-4 bg-[#1e1e1e] rounded flex items-center justify-center"
        >
          <BsArrowClockwise className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="bg-[#1e1e1e] p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-[800px]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-bold">Tetris Break</h2>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white"
          >
            <VscChromeClose className="text-xl" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="relative bg-[#121212] p-2 rounded mx-auto sm:mx-0">
            {gameOver && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl text-white mb-4">Game Over!</h3>
                  <p className="text-white mb-4">Score: {score}</p>
                  <button
                    onClick={() => {
                      setBoard(createEmptyBoard());
                      setScore(0);
                      setGameOver(false);
                      setCurrentPiece(getRandomPiece());
                      setNextPiece(getRandomPiece());
                      setPosition({ x: 4, y: 0 });
                    }}
                    className="px-4 py-2 bg-[#007acc] text-white rounded hover:bg-[#006bb3]"
                  >
                    {language === 'fr' ? 'Recommencer' : 'Restart'}
                  </button>
                </div>
              </div>
            )}

            <div 
              className="grid gap-px" 
              style={{ 
                gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
                width: `min(${BOARD_WIDTH * 25}px, 90vw)`,
                height: `min(${BOARD_HEIGHT * 25}px, 80vh)`,
              }}
            >
              {board.map((row, y) => 
                row.map((cell, x) => {
                  let color = cell;
                  if (!gameOver && 
                      y >= position.y && 
                      y < position.y + currentPiece.shape.length &&
                      x >= position.x && 
                      x < position.x + currentPiece.shape[0].length) {
                    const pieceY = y - position.y;
                    const pieceX = x - position.x;
                    if (currentPiece.shape[pieceY] && 
                        currentPiece.shape[pieceY][pieceX] === 1) {
                      color = currentPiece.color;
                    }
                  }
                  return (
                    <div
                      key={`${y}-${x}`}
                      className="aspect-square border border-[#1e1e1e]"
                      style={{ 
                        backgroundColor: color || '#121212',
                        transition: 'background-color 0.1s'
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div className="flex flex-row sm:flex-col justify-center sm:justify-start gap-4 sm:gap-6">
            <div className="bg-[#121212] p-2 rounded">
              <h3 className="text-white text-sm mb-2">
                {language === 'fr' ? 'Suivant' : 'Next'}
              </h3>
              <div className="flex justify-center">
                {renderNextPiece()}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white">Score: {score}</p>
              <p className="text-sm text-white/60 mt-2 hidden sm:block">
                ⌨️ {language === 'fr' ? 'Utilisez les flèches pour jouer' : 'Use arrow keys to play'}
              </p>
            </div>
          </div>
        </div>

        {renderMobileControls()}
      </div>
    </div>
  );
};

export default Tetris; 