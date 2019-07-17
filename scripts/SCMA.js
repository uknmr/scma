import env from './env.js'

class SCMA {
  constructor() {
    this.$inputProjectId = document.getElementById('js-shared-projectId')
    this.$inputTitle = document.getElementById('js-shared-title')
    this.$inputText = document.getElementById('js-shared-text')
    this.$submitButton = document.getElementById('js-create-button')
  }

  addOnClick() {
    this.$submitButton.addEventListener('click', () => {
      const { projectId, title, text } = this.getInputValue()
      const urls = this.extractURLs(text)

      if (!urls) {
        return
      }

      const url = urls.pop()
      const body = this.generateBody({ title, text, url })

      this.setProjectId(projectId)

      open(`https://scrapbox.io/${projectId}/${title}?body=${body}`)
    })
  }

  getInputValue() {
    return {
      projectId: this.$inputProjectId.value,
      title: encodeURIComponent(this.$inputTitle.value.trim()),
      text: this.$inputText.value,
    }
  }

  setProjectId(projectId) {
    if (!projectId) {
      return
    }

    localStorage.setItem(env.LOCALSTORAGE_PROJECT_ID, projectId)
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
