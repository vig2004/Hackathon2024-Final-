
const lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
const foundItems = JSON.parse(localStorage.getItem('foundItems')) || [];
const applications = JSON.parse(localStorage.getItem('applications')) || [];


function postNotice(event) {
    event.preventDefault();
    const itemType = document.getElementById('item-type').value;
    const description = document.getElementById('item-description').value;
    const contactInfo = document.getElementById('contact-info').value;

    const item = { description, contactInfo };
    
    if (itemType === 'lost') {
        lostItems.push(item);
        localStorage.setItem('lostItems', JSON.stringify(lostItems));
        displayLostItems();
    } else {
        foundItems.push(item);
        localStorage.setItem('foundItems', JSON.stringify(foundItems));
        displayFoundItems();
    }

    document.getElementById('post-form').reset();
}


function displayLostItems() {
    const lostItemsList = document.getElementById('lost-items-list');
    lostItemsList.innerHTML = '';
    lostItems.forEach((item, index) => {
        lostItemsList.innerHTML += 
            `<p>${item.description} - Contact: ${item.contactInfo} 
            <button onclick="deleteLostItem(${index})">Delete</button></p>`;
    });
}


function displayFoundItems() {
    const foundItemsList = document.getElementById('found-items-list');
    foundItemsList.innerHTML = '';
    foundItems.forEach((item, index) => {
        const message = `Hi, I am interested in your found item: "${item.description}". Can you please provide more details?`;
        const contactNumber = item.contactInfo;
        foundItemsList.innerHTML += 
            `<p>${item.description} - Contact: ${item.contactInfo} 
            <a href="https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}" target="_blank">Apply</a>
            <button onclick="deleteFoundItem(${index})">Delete</button></p>`;
    });
}


function searchItems() {
    const query = document.getElementById('search-query').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    const allItems = [...lostItems, ...foundItems];
    const filteredItems = allItems.filter(item => item.description.toLowerCase().includes(query));

    if (filteredItems.length > 0) {
        filteredItems.forEach(item => {
            searchResults.innerHTML += `<p>${item.description} - Contact: ${item.contactInfo}</p>`;
        });
    } else {
        searchResults.innerHTML = '<p>No items found.</p>';
    }
}


function deleteLostItem(index) {
    lostItems.splice(index, 1);
    localStorage.setItem('lostItems', JSON.stringify(lostItems));
    displayLostItems();
}


function deleteFoundItem(index) {
    foundItems.splice(index, 1);
    localStorage.setItem('foundItems', JSON.stringify(foundItems));
    displayFoundItems();
}


function submitApplication(event) {
    event.preventDefault();
    const name = document.getElementById('applicant-name').value;
    const contact = document.getElementById('applicant-contact').value;
    const itemDescription = document.getElementById('item-description-apply').value;
    const comments = document.getElementById('comments').value;

    const application = { name, contact, itemDescription, comments };
    applications.push(application);
    localStorage.setItem('applications', JSON.stringify(applications));

    
    removeMatchingItems(itemDescription);

    displayApplications();
    displayLostItems();
    displayFoundItems();
    document.getElementById('application-form').reset();
}


function removeMatchingItems(description) {
   
    const foundIndex = foundItems.findIndex(item => item.description === description);
    if (foundIndex !== -1) {
        foundItems.splice(foundIndex, 1);
        localStorage.setItem('foundItems', JSON.stringify(foundItems));
    }

    
    const lostIndex = lostItems.findIndex(item => item.description === description);
    if (lostIndex !== -1) {
        lostItems.splice(lostIndex, 1);
        localStorage.setItem('lostItems', JSON.stringify(lostItems));
    }
}


function displayApplications() {
    const applicationsList = document.getElementById('applications-list');
    applicationsList.innerHTML = '';
    applications.forEach(app => {
        applicationsList.innerHTML += 
            `<div class="application-paper">
                <h3>Application for Item: ${app.itemDescription}</h3> 
                <p>Name: ${app.name}</p>
                <p>Contact: ${app.contact}</p>
                <p>Comments: ${app.comments}</p>
            </div>`;
    });
}


function deleteApplication(index) {
    applications.splice(index, 1);
    localStorage.setItem('applications', JSON.stringify(applications));
    displayApplications();
}


function openApplicationForm(index) {
    const foundItem = foundItems[index];
    document.getElementById('item-description-apply').value = foundItem.description;
    document.getElementById('applicant-name').focus();
}


window.onload = function() {
    displayLostItems();
    displayFoundItems();
    displayApplications();
};
