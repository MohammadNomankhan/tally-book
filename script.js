const showModal = document.getElementById('showModal');
const closeModal = document.getElementById('closeIcon');
const container = document.getElementById('container');
const modalContainer = document.getElementById('modal-container');
const modalForm = document.getElementById('modal__form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');

let bookmarks = [];

///////////////////////////////
// open and close modal
function openModal() {
	modalContainer.classList.add('show-modal');
	websiteNameEl.focus();
}
// event to showing modal
showModal.addEventListener('click', openModal);
closeModal.addEventListener('click', () => { modalContainer.classList.remove('show-modal')})
window.addEventListener('click', (e) => {e.target === modalContainer ? modalContainer.classList.remove('show-modal') : false})


///////////////////////////////
// form validation

// check format of url
function validateUrl(valNname, valUrl) {
	 const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
	 const regex = new RegExp(expression);

	 if(!valNname || !valUrl){
	 	alert('enter both feilds.');
	 	return false;
	 }

	 if (!valUrl.match(regex)) {
	 	alert('please enter valid url');
	 	return false;
	 }

	 return true;
}

// store locally
function fetchBookmarks() {
	if(localStorage.getItem('bookmarks')){
		bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	} else {
		bookmarks = [
			{
				name: 'GitHub',
				url: 'https://github.com'
			},
		];
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	console.log(bookmarks);
}

// handle form data
function storeBookmark(e) {
	e.preventDefault();
	const name = websiteNameEl.value;
	let url = websiteUrlEl.value;

	if(!(url.includes('http://')) && !(url.includes('https://'))) {
		url = `https://${url}`;
	}

	if (!validateUrl(name, url)) {
		return false;
	}

	const bookmark = {
		name: name,
		url: url,
	};
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
	modalForm.reset();
	websiteNameEl.focus();
}

modalForm.addEventListener('submit', storeBookmark);

// on load
fetchBookmarks();












// -------------------------------------------------------------------


// what I learned while building modal?
/*

building modal is part of html and css but adding functionality is js part
- we added a click event to the h1 element aka showModal, which adds a class which changes display to flex 
- now we added an event listener to close icon to do reverse
*- lastly, we added an event to check if user clicks anwhere expect form to remoove show-modal class

*/
// what I learned while form validartion
/*

so first we need to grab both fields which is straight fwd, we just need to name 2 variables and assign them websiteNameEl.value resp
-we will check if http is there ot not
-we make a function to validatoe i/p
-that function will first chekc if fields are emplty
-then we make a regex exp, new RegExp(exp)
-use i/p.match(regex)
-we keep returning false when needed, so it breaks oit of execution


*/