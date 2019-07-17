class SCMA {
  constructor() {
    this.$inputTitle = document.getElementById('js-shared-title')
    this.$inputText = document.getElementById('js-shared-text')
    this.$submitButton = document.getElementById('js-create-button')
  }

  addOnClick() {
    this.$submitButton.addEventListener('click', () => {
      const project = 'uknmr'
      const title = this.$inputTitle.value
      const text = this.$inputText.value
      const urls = this.extractURLs(text)

      if (!urls) {
        return
      }

      const url = urls.pop()
      const body = this.generateBody({ title, text, url })

      open(
        `https://scrapbox.io/${project}/` +
          encodeURIComponent(title.trim()) +
          '?body=' +
          body,
      )
    })
  }

  extractURLs(text) {
    const regexp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-\.\/?%&=]*)?/g
    return text.match(regexp)
  }

  generateBody({ title, text, url }) {
    const lines = [`[${url} ${title}]`]
    lines.push('[スクマ]')

    if (text) {
      lines.push(text.replace(new RegExp(url, 'g'), '').trim())
    }

    lines.push('')

    return encodeURIComponent(lines.join('\n'))
  }
}

export default new SCMA()
