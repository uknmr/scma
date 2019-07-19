import env from './env.js'

class SCMA {
  constructor() {
    this.$inputProjectId = document.getElementById(
      env.SELECTOR_INPUT_PROJECT_ID,
    )
    this.$inputTitle = document.getElementById(env.SELECTOR_INPUT_TITLE)
    this.$inputText = document.getElementById(env.SELECTOR_INPUT_TEXT)
    this.$checkbox = document.getElementById(env.SELECTOR_CHECKBOX)
    this.$submitButton = document.getElementById(env.SELECTOR_CREATE_BUTTON)
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

      open(
        `https://scrapbox.io/${projectId}/${encodeURIComponent(
          title,
        )}?body=${body}`,
      )
    })
  }

  getInputValue() {
    return {
      projectId: this.$inputProjectId.value,
      title: this.$inputTitle.value.trim(),
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
    const regexp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-\.\/?%&=@]*)?/g
    return text.match(regexp)
  }

  generateBody({ title, text, url }) {
    const lines = [`[${url} ${title}]`]

    if (this.$checkbox.checked) {
      lines.push('[スクマ]')
    }

    if (text) {
      lines.push(text.replace(new RegExp(url, 'g'), '').trim())
    }

    lines.push('')

    return encodeURIComponent(lines.join('\n'))
  }
}

export default new SCMA()
