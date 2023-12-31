import { LitElement, html } from "lit";
import { repeat } from "lit/directives/repeat.js";

export class MyListElement extends LitElement {
  static properties = {
    items: { type: Array },
    name: { type: String }
  }

  constructor() {
    super();
    this.name = 'Tony Stark';
    this.items = ['Mark 42', 'Mark 43'];
  }
  
  render() {
    return html`
      <div>
        <h1>${this.name}'s list</h1>
        <ul>
          ${
            repeat(
              this.items,
              (item) => html`<li>${item}</li>`
            )
          }
        </ul>
      </div>`;
  }
}

customElements.define('my-list', MyListElement);
