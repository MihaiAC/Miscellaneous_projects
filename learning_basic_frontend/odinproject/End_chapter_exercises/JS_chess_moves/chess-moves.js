const deltas = [
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
];

/**
 *
 * @param {number[]} start - [x, y]
 * @param {number[]} end   - [x, y]
 * @returns {string}
 */
function knightMoves(start, end) {
  let [cx, cy] = [0, 0];
  let [dx, dy] = [0, 0];
  let currentPath,
    pathCopy = null;
  let [ex, ey] = end;
  let currentSpots = [[start, [start]]];
  let visited = [start];
  let currVisited = false;

  while (true) {
    let nextSpots = [];
    for (index = 0; index < currentSpots.length; index++) {
      [[cx, cy], currentPath] = currentSpots[index];

      if (cx === ex && cy === ey) {
        return currentPath;
      }

      for (deltaIndex = 0; deltaIndex < deltas.length; deltaIndex++) {
        [dx, dy] = deltas[deltaIndex];
        if (cx + dx < 8 && 0 < cx + dx && cy + dy < 8 && 0 < cy + dy) {
          currVisited = false;
          for (
            visitedIndex = 0;
            visitedIndex < visited.length;
            visitedIndex++
          ) {
            if (
              visited[visitedIndex][0] === cx + dx &&
              visited[visitedIndex][1] === cy + dy
            ) {
              currVisited = true;
              break;
            }
          }

          if (!currVisited) {
            visited.push([cx + dx, cy + dy]);
            pathCopy = JSON.parse(JSON.stringify(currentPath));
            pathCopy.push([cx + dx, cy + dy]);
            nextSpots.push([[cx + dx, cy + dy], pathCopy]);
          }
        }
      }
    }
    currentSpots = nextSpots;
  }
}

console.log(knightMoves([3, 3], [4, 3]));
