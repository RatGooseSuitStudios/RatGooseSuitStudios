const ENDPOINT = 'https://api.github.com/repos/%/releases';
const MAX_RELEASES = 3;

/** @typedef {{ html_url: string; name: string; body: string; zipball_url: string; assets: unknown[]; }} Release */

customElements.define('gh-releases', class extends HTMLElement {
	constructor() {
		super();
		this.repo = this.getAttribute('data-repo');
		this.url = ENDPOINT.replace('%', this.repo);
		
		// Make temporary release before we finish loading.
		this.appendChild(this.makeRelease({
			name: 'v0.0.0',
			body: 'Loading...',
			html_url: '#',
			zipball_url: '#',
			assets: []
		}));

		// Start off the async loading func
		this.load();
	}

	/** @param {Release} def */
	makeRelease(def) {
		const title_link = document.createElement('a');
		const title = document.createElement('h3');
		const body = document.createElement('pre');
		const download = document.createElement('a');
		const root = document.createElement('div');
		title_link.href = def.html_url;
		title.textContent = def.name;
		body.textContent = def.body;
		download.textContent = 'Download';
		download.classList.add('download');
		download.href = def.zipball_url;

		title_link.appendChild(title);
		root.replaceChildren(title_link, body, download);
		return root;
	}

	async load() {
		console.log('Loading from', this.url);
		
		try {
			const req = await fetch(this.url);
			/** @type {Release[]} */
			const body = await req.json();
	
			if (body.length > MAX_RELEASES) body.length = MAX_RELEASES;
			const releases = body.map(def => this.makeRelease(def));
			this.replaceChildren(...releases);
		}

		catch(e) {
			this.innerHTML = '<h3>Something went wrong!</h3><code></code>';
			this.lastElementChild.textContent = e+'';
		}
	}
});
