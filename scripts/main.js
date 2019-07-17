import ShareTarget from './ShareTarget.js'
import SCMA from './SCMA.js'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}

ShareTarget.setInputValue()
SCMA.addOnClick()
