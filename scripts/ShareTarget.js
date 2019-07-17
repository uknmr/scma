class ShareTarget {
  constructor() {
    const parsedUrl = new URL(location)
    this.queries = parsedUrl.searchParams

    this.$inputTitle = document.getElementById('js-shared-title')
    this.$inputText = document.getElementById('js-shared-text')
  }

  setInputValue() {
    this.$inputTitle.value = this.queries.get('title')
    this.$inputText.value = this.queries.get('text')
  }
}

export default new ShareTarget()
