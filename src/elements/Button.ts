export class Button extends HTMLElement {
  static register() {
    if (!window.customElements.get("vui-button")) {
      console.log("registering");
      window.customElements.define("vui-button", Button);
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    console.log("connected");
    this.render();
  }

  render() {
    console.log("render");
    if (this.shadowRoot) {
      const button = document.createElement("button");
      button.innerText = this.parentNode?.textContent?.trim() || "";
      this.shadowRoot.append(button);
    }
  }
}

export default Button;
