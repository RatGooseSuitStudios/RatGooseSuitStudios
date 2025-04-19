const EMBED_TEMPLATE = `<iframe title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
const PROMPT_TEMPLATE = `<div class="cookie-prompt"><div><span>YouTube violates no-tracking signals. By playing this video, you consent to being tracked.</span><button>Play</button></div></div>`;

customElements.define('yt-video', class extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = PROMPT_TEMPLATE;

		/** @type {HTMLElement} */
		this._frame = this.firstElementChild;
		this._w = this.getAttribute('width');
		this._h = this.getAttribute('height');
		this._frame.style.width = this._w+'px';
		this._frame.style.height = this._h+'px';
		this._frame.style.backgroundImage = 'url('+this.getAttribute('thumb')+')';
		this.querySelector('button').addEventListener('click', () => this.startup());
	}
	
	startup() {
		this.innerHTML = EMBED_TEMPLATE;
		this._frame = this.firstElementChild;
		this._frame.src = this.getAttribute('src');
		this._frame.width = this._w;
		this._frame.height = this._h;
	}
});
