import env from './env.js'

class ShareTarget {
  constructor() {
    this.lastProjectId = localStorage.getItem(env.LOCALSTORAGE_PROJECT_ID)

    const parsedUrl = new URL(location)
    this.queries = parsedUrl.searchParams

    this.$inputProjectId = document.getElementById(
      env.SELECTOR_INPUT_PROJECT_ID,
    )
    this.$inputTitle = document.getElementById(env.SELECTOR_INPUT_TITLE)
    this.$inputText = document.getElementById(env.SELECTOR_INPUT_TEXT)
  }

  setInputValue() {
    this.$inputProjectId.value = this.lastProjectId
    this.$inputTitle.value = this.queries.get('title')
    this.$inputText.value = this.queries.get('text')
  }
}

export default new ShareTarget()
