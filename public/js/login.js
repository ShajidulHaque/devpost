class Login {
	constructor() {
		this.email = document.querySelector('#email');
		this.password = document.querySelector('#password');
		this.btn = document.querySelector('#btn');
		this.checkbox = document.querySelector('#checkbox');
	}

	exit() {
		this.btn.addEventListener('click', async (e) => {
			e.preventDefault();
			
			if (this.email.value && this.password.value) {
				const test = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				const testResult = test.test(this.email.value);
				const checked = this.checkbox.checked;

				if (testResult && checked) {
					const data = {
						email: this.email.value,
						password: this.password.value
					}

					const response = await fetch('/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data),
					});
					
					const resData = await response.json();
					
					if (resData && resData.error) {
						swal('Sign in falied!', data.error.message, 'error');
						setTimeout(() => {
							location.reload()
						}, 1000);
					}

					if (resData && resData.success) {
						swal('Sign in successful!', 'success');
						localStorage.setItem('token', resData.success.loggedInUser);
						location.replace('/post');
					}
					
				} else {
					swal("Sign in falied!", "Required validate email and checkbox on for sign in", "error");
				}

			} else {
				swal("Sign in falied!", "Required all input for sign in", "error");
			}
		})

	}
}

(new Login).exit();