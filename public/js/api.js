class Api {
	constructor() {
		this.button = document.querySelector('.btn');
		this.method = document.querySelector('.set_method_result');
		this.url = document.querySelector('#url');
		this.body = document.querySelector('#inputOfBody');
		this.showResponse = document.querySelector('.show_response');
	}

	getHeaders() {
		let header = {}

		requestHeader.map(val => {
			let obj = { ...val }
			header[obj[0]] = obj[1]
		})

		return header;
	}

	send() {
		this.button.addEventListener('click', async (e) => {
			e.preventDefault();
			if (this.url.value) {
				const orgUrl = this.url.value.trim();

				if (this.method.innerHTML === 'GET') {
					fetch(orgUrl, {
							method: this.method.innerHTML,
							headers: this.getHeaders(),

						})
						.then(res => res.json())
						.then(data => {
							this.showResponse.innerHTML = JSON.stringify(data);
						})
				} else {
					fetch(orgUrl, {
							method: this.method.innerHTML,
							headers: this.getHeaders(),
							body: this.body.value
						})
						.then(res => res.json())
						.then(data => {
							this.showResponse.innerHTML = JSON.stringify(data);
						})
				}
			}
		});
	}

}

(new Api).send();