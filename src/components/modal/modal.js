import Element from '../element/element'
class Modal extends Element {
    constructor(title) {
        super()
        this.title = title
        this.modalContainer = this.createElement("div", ["card-modal", "modal", "fade", "show"])
        this.modalBackdrop = this.createElement("div", ['card-modal__backdrop', 'modal-backdrop'])
    }
    render() {
        const html = `<div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">${this.title}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                ${this.renderBody()}
                </div>
                <div class="modal-footer">
                ${this.renderBtn()}
                </div>
              </div>
          </div>`
        document.body.classList.add("modal-open")
        this.modalContainer.insertAdjacentHTML('beforeend', html)
        return document.getElementById("root").prepend(this.modalContainer, this.modalBackdrop)
    }
    renderBody() {
        return ''
    }
    renderBtn() {
        return ''
    }

    show() {
        this.addCloseListener()
        this.render()
    }
    hide() {
        document.body.classList.remove("modal-open")
        this.modalContainer.innerHTML = ''
        this.modalContainer.remove()
        this.modalBackdrop.remove()
    }
    addCloseListener() {
        this.modalContainer.addEventListener("click", (e) => {
            if (e.target === this.modalContainer || e.target === this.modalContainer.querySelector(".btn-close")) {
                this.hide()
            }
        })
    }
}

export default Modal