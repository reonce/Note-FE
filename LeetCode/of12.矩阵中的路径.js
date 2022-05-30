/**
 * https://leetcode.cn/problems/ju-zhen-zhong-de-lu-jing-lcof/
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 */

var exist = function (board, word) {
  const h = board.length,
    w = board[0].length;
  const visited = new Array(h);
  const dirction = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];
  for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(w).fill(false);
  }

  /**检查节点是否符合下一个字符，若符合且没结束，继续查 */
  const check = (i, j, str, k) => {
    if (board[i][j] !== str.charAt(k)) {
      return false;
    } else if (k === str.length - 1) {
      return true;
    }
    visited[i][j] = true;
    let result = false;
    for (const [dx, dy] of dirction) {
      let newi = i + dx,
        newj = j + dy;
      /**边界判断 */
      if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
        /**如果没访问过 */
        if (!visited[newi][newj]) {
          const judge = check(newi, newj, str, k + 1);
          if (judge) {
            result = true;
            break;
          }
        }
      }
    }
    visited[i][j] = false;
    return result;
  };

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const flag = check(i, j, word, 0);
      if (flag) {
        return true;
      }
    }
  }
  return false;
};
