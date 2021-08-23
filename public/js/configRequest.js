const requestHeader = [];

(function configHeader() {
	const body = []

	const requestNavLists = document.querySelectorAll('.request_nav>ul>li')
	const type = document.querySelector('.type');
	const keyValueInput = document.querySelector('.key_value_input');
	const setting = document.querySelector('.setting');
	const reqBody = document.querySelector('.reqBody');
	
	requestNavLists.forEach(item => {
		item.addEventListener('click', (e) => {
			const allItem = e.target.parentElement.children
			for (var i = 0; i < allItem.length; i++) {
				allItem[i].style.borderBottom = '0'
			}
			
			if (item.innerHTML == 'Headers') {
				type.innerHTML = item.innerHTML;
				item.style.borderBottom = '2px solid #3775ED';
				keyValueInput.style.display = 'block';
				setting.style.display = 'none';
				reqBody.style.display = 'none';
			} else if (item.innerHTML == 'Body') {
				type.innerHTML = item.innerHTML;
				item.style.borderBottom = '2px solid #3775ED';
				keyValueInput.style.display = 'none';
				setting.style.display = 'none';
				reqBody.style.display = 'block';
			} else if (item.innerHTML == 'Nots') {
				type.innerHTML = item.innerHTML;
				item.style.borderBottom = '2px solid #3775ED';
				keyValueInput.style.display = 'none';
				setting.style.display = 'none';
				reqBody.style.display = 'none';
			} else if (item.innerHTML == 'Settings') {
				type.innerHTML = item.innerHTML;
				item.style.borderBottom = '2px solid #3775ED';
				keyValueInput.style.display = 'none';
				setting.style.display = 'block';
				reqBody.style.display = 'none';
			}
		})
	})

	function handleRequestForm() {
		const valueOfRequest = document.querySelector('.valueOfRequest')
		const form = valueOfRequest.parentElement.children[1]
		
		form.addEventListener('submit', (e) => {
			e.preventDefault()
			
			const itemOfVal = createHtmlElm('div', false, 'itemOfVal');
			const span1 = createHtmlElm('span');
			const span2 = createHtmlElm('span', false, 'value');
			const img = createHtmlElm('img', false, 'remove', './img/remove.png')
			
			if (e.target.children[0].value) {
				const type = e.target.parentElement.parentElement.children[0];
				const key = e.target.children[0].value
				const value = e.target.children[1].value

				span1.innerHTML = key;
				span2.innerHTML = value;
				
				if ((type.innerHTML).trim() == 'Headers') {
					requestHeader.push([key, value])
				}
				
				itemOfVal.append(span1, span2, img)
				valueOfRequest.append(itemOfVal)

				e.target.children[0].value = '';
				e.target.children[1].value = ''
			}

		})
		
		valueOfRequest.addEventListener('click', (e) => {
			if (e.target.tagName == 'IMG') {
				e.target.parentElement.remove();
			}
		})

	}

	handleRequestForm();
	
	
})();

// handle work_nav_area
(function() {
	const workNavAreaList = document.querySelectorAll('.work_nav_area>ul>li');
	
	for (var i = 0; i < workNavAreaList.length; i++) {
		workNavAreaList[i].addEventListener('click', (e) => {
			console.log(e.target.parentElement);
		})
	}
	
})();


