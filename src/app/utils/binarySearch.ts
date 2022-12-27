import { IProduct } from '../types/interfaces'

export function binarySearch(array: IProduct[], item: number): IProduct {
  let start = 0
  let end = array.length
  let middle = 0
  let found = false
  let position = -1
  while (found === false && start <= end) {
    middle = Math.floor((start + end) / 2)
    if (array[middle].id === item) {
      found = true
      position = middle
      return array[middle]
    }
    if (item < array[middle].id) {
      end = middle - 1
    } else {
      start = middle + 1
    }
  }
  return array[middle]
}
