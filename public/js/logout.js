const logout = document.querySelector('#logout');

logout.addEventListener('click', async (e) => {
	e.preventDefault();
	const response = await fetch('/post', {
		method: 'DELETE',
	});

	const resData = await response.json();

	if (resData.success) {
		localStorage.removeItem('token')
		swal('Logout successful!', resData.success.message, 'success');
		setTimeout(() => {
			location.replace('/')
		}, 2000)
	}
	
	if (resData.error) {
		swal('Logout falied!', resData.error.message, 'error');
	}

})