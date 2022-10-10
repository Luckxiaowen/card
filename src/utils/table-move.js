export function moveUp(arr, index) {
  console.log("上移")
  arr.splice(index - 1, 1, ...arr.splice(index, 1, arr[index - 1]))
}

export function moveDown(arr, index) {
  console.log("下移")

  arr.splice(index, 1, ...arr.splice(index + 1, 1, arr[index]))
}
