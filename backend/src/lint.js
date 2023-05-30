const funs = [];
for (let i = 0; i < 13; i++) {
  funs[i] = function() {
    return i;
  };
}
console.log(funs[0]());
console.log(funs[1]());
console.log(funs[2]());
console.log(funs[3]());