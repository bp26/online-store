import { View } from './app/components/views/view'
import './style.scss'

const root = document.querySelector('.main__root')
if (!(root instanceof HTMLElement)) {
  throw new Error('Element "Main" not found')
}

const appIgnor = new View(root)
