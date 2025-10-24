import BoardPathFromMatrix from './components/board/BoardPathFromMatrix';

const MATRIX: (0 | 1)[][] = [
  // 너가 준 배열 (행 7, 열 4)
  [1, 1, 1, 1],
  [0, 0, 0, 1],
  [0, 1, 1, 1],
  [0, 1, 0, 0],
  [0, 1, 1, 1],
  [0, 0, 0, 1],
  [0, 0, 0, 1],
];

const Board: any = () => {
  return (
    <div>
      <div className='absolute inset-0 p-3'>
        <BoardPathFromMatrix matrix={MATRIX} radius={500} cellSize={90} />
      </div>
    </div>
  );
};
export default Board;
