// create html element
function createHtmlElm(tagName, id, tagClass, src) {
	if (tagName) {
		var elm = document.createElement(tagName);
		if (id) {
			elm.setAttribute('id', id);
		}

		if (tagClass) {
			elm.classList.add(tagClass)
		}

		if (src) {
			elm.src = src;
		}

		return elm;
	} else {
		return null;
	}

}

// handle request method
(function showAllMethodOnUi() {
	const userMethod = document.querySelector('.user_method');
	const method = document.querySelector('.set_method_result');
	const outsideMethod = document.querySelector('.method');

	userMethod.addEventListener('click', (e) => {
		if (e.target.tagName == 'LI') {
			const urlRequestArea = document.querySelector('.url_request_area');

			method.textContent = e.target.textContent;

			const child = urlRequestArea.children

			for (var i = 0; i < child.length - 1; i++) {
				const style = window.getComputedStyle(child[i]);

				if (style.borderTop == '3px solid rgb(55, 117, 237)') {
					child[i].children[0].children[0].innerHTML = e.target.textContent
				}
			}
		}
	})
})();

// real-time url writing
(function configUrlInput() {
	const urlInput = document.querySelector('#url');
	const urlRequestArea = document.querySelector('.url_request_area');
	const outsideMethod = document.querySelector('.method');
	const method = document.querySelector('.set_method_result');

	urlInput.addEventListener('input', (e) => {
		const selectedItem = urlRequestArea.children
		for (var i = 0; i < selectedItem.length; i++) {
			const computedStyle = window.getComputedStyle(selectedItem[i]).borderTopColor
			if (computedStyle == 'rgb(55, 117, 237)') {
				selectedItem[i].children[0].children[1].innerHTML = e.target.value;
				selectedItem[i].children[0].children[0].innerHTML = method.innerHTML;
			}
		}
	})
})();

// create or remove new request section
(function createNewRequest() {
	const urlRequestArea = document.querySelector('.url_request_area');
	const urlInput = document.querySelector('#url');
	const setMethodResult = document.querySelector('.set_method_result')

	urlRequestArea.addEventListener('click', (e) => {
		if (e.target.classList[0] == 'add') {

			const inputAllRequest = createHtmlElm('div', false, 'input_all_request')
			const valueOfUser = createHtmlElm('div', false, 'value_of_user');
			const method = createHtmlElm('p', false, 'method');
			const input = createHtmlElm('p', false, 'input');
			const img = createHtmlElm('img', false, 'remove', './img/remove.png');

			method.innerHTML = 'GET'
			input.innerHTML = 'Take new route';

			var elmOfObj = e.target.parentElement.parentElement.children;

			for (var i = 0; i < elmOfObj.length; i++) {
				if (elmOfObj[i].classList[0] == 'input_all_request') {
					elmOfObj[i].style.borderTop = '0'
				}
			}

			valueOfUser.append(method, input)
			inputAllRequest.append(valueOfUser, img);

			urlRequestArea.prepend(inputAllRequest)
			urlInput.value = ''
			setMethodResult.innerHTML = 'GET'
		}
	})

	urlRequestArea.addEventListener('click', (e) => {
		if (e.target.classList[0] == 'remove') {
			e.target.parentElement.remove();
		}
	})

	urlRequestArea.addEventListener('click', (e) => {
		if (e.target.classList[0] == 'input' || e.target.classList[0] == 'method') {

			var elmOfObj = e.target.parentElement.parentElement.parentElement.children;
			for (var i = 0; i < elmOfObj.length; i++) {
				if (window.getComputedStyle(elmOfObj[i]).borderTopColor == 'rgb(55, 117, 237)') {
					elmOfObj[i].style.borderTop = '0px'
				}
			}

			if (e.target.parentElement.parentElement.classList[0] == 'input_all_request') {
				const inputAllRequest = e.target.parentElement.parentElement
				inputAllRequest.style.borderTop = '3px solid rgb(55, 117, 237)';
				const valueOfOutsideUrl = e.target.parentElement.children[1].innerHTML;
				const valueOfOutsideMethod = e.target.parentElement.children[0].innerHTML;
				const setMethodResult = document.querySelector('.set_method_result');
				setMethodResult.innerText = valueOfOutsideMethod;
				
				if (valueOfOutsideUrl !== 'Take new route') {
					const urlInput = document.querySelector('#url');
					urlInput.value = valueOfOutsideUrl;
				}
			}

		}
	})
})()
