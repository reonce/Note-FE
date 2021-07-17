# 迷宫题
实现随机一个入口和出口
```
function create(m, n) {
  //初始化一个maze数组
  const maze = new Array(m);
  //遍历将每一项初始化为0
  for (let i = 0; i < maze.length; i++) {
    maze[i] = new Array(n).fill(0);
  }

  /*入口随机*/
  //随机取横坐标
  let _m = Math.ceil(Math.random() * (m - 1));
  //当为最底部或最顶部的边的时候，取随机纵坐标
  if (_m === m - 1 || !_m) {
    _n = Math.ceil(Math.random() * (n - 1));
  } else {
    //当不为最底部或最顶部的边的时候，那么只有左右两边能取
    _n = Math.random() > 0.5 ? n - 1 : 0;
  }
  maze[_m][_n] = 2;

  /*出口随机*/
  let outm = _m;
  while (outm === _m) {
    outm = Math.ceil(Math.random() * (m - 1));
  }
  if (outm === m - 1 || !_m) {
    outn = Math.ceil(Math.random() * (n - 1));
  } else {
    outn = Math.random() > 0.5 ? n - 1 : 0;
  }
  maze[outm][outn] = 3;
  const copy = [outm, outn];
  let x = _m, y = _n;
  console.log(x, y, outm, outn)
  while(maze[outm][outn] !== 1 ) {
    console.log(1111, maze)
    const direction = []; 
    if(maze[x+1]) {
      // 向右移动一格
      if( maze[x+1][y] !== undefined && maze[x+1][y] !==2) {
        direction.push([x+1, y])
      }
      // 向上移动一格
      if( maze[x][y-1] !== undefined && maze[x][y-1] !==2) {
        direction.push([x, y-1])
      }
    }
    // 向下移动一格
    if(maze[x]) {
      if(maze[x][y+1] !== undefined && maze[x][y+1] !==2) {
        direction.push([x, y+1])
      }
    }
    // 向左移动一格
    if(maze[x-1]) {
      if(maze[x-1][y] !== undefined && maze[x-1][y] !==2) {
        direction.push([x-1, y])
      }
    }
    console.log('初始位置', _m, _n)
    console.log('direction', direction)
    const len = direction.length;
    console.log('len', len)
    const coordinate = Math.ceil(Math.random() * (len));
    console.log('coordinate', coordinate)
    const move = direction[coordinate-1];
    console.log('move', move)
    x = move[0];
    y = move[1];
    maze[x][y] = 1;    
  }
  maze[copy[0]][copy[1]] = 3;
  console.log('maze', maze);   
}
create(5, 5);
```
