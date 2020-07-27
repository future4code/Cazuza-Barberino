function editMatrix(matrix, x, y, val) {
  if (x < matrix.length && y < matrix[x].length) {
    matrix[x][y] = val;
  } else {
    console.log("error");
  }
}
