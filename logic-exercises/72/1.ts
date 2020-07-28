function isOneEdit(edit, original) {
  let edits = 0;

  edits += Math.abs(edit.length - original.length);

  for (let i = 0; i < Math.min(original.length, edit.length); i++) {
    if (edit[i] !== original[i]) edits++;
  }

  return edits === 1;
}

console.log(isOneEdit("banan", "banana"));
console.log(isOneEdit("bananak", "banana"));
console.log(isOneEdit("panana", "banana"));
console.log(isOneEdit("bananaaa", "banana"));
