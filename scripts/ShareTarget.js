import env from './env.js'

class ShareTarget {
  constructor() {
    this.lastProjectId = localStorage.getItem(env.LOCALSTORAGE_PROJECT_ID)

    const parsedUrl = new URL(location)
    this.queries = parsedUrl.searchParams

    this.$inputProjectId = document.getElementById('js-shared-projectId')
    this.$inputTitle = document.getElementById('js-shared-title')
    this.$inputText = document.getElementById('js-shared-text')
  }

  setInputValue() {
    this.$inputProjectId.value = this.lastProjectId
    this.$inputTitle.value = this.queries.get('title')
    this.$inputText.value = this.queries.get('text')
  }
}

export default new ShareTarget()
