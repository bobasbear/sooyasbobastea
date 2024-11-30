// Handle purchase data submission (send data to the server)
document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const purchases = document.getElementById('purchasesInput').value.trim();

    if (name && purchases) {
        // Send data to the server
        fetch('/save-purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                purchases: purchases.split(',').map(item => item.trim())
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Purchases saved successfully!');
            document.getElementById('nameInput').value = '';
            document.getElementById('purchasesInput').value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error saving purchases');
        });
    } else {
        alert('Please fill in both fields.');
    }
});
// Search function (searches the server for the name)
function searchPurchases() {
    const name = document.getElementById('searchNameInput').value.trim();

    if (name === "") {
        alert("Please enter a name.");
        return;
    }

    fetch(`/search-purchase?name=${name}`)
        .then(response => response.json())
        .then(data => {
            const purchaseList = document.getElementById('purchaseList');
            purchaseList.innerHTML = '';  // Clear previous results
            if (data.purchases && data.purchases.length > 0) {
                data.purchases.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    purchaseList.appendChild(li);
                });
            } else {
                purchaseList.innerHTML = "<li>No purchases found for this name.</li>";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error searching for purchases');
        });
}
// Handle deletion of purchases
document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('deleteNameInput').value.trim();

    if (name) {
        fetch('/delete-purchase', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting purchases');
        });
    } else {
        alert("Please enter a name.");
    }

    document.getElementById('deleteNameInput').value = '';
});