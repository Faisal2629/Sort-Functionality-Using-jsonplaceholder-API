document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const productList = document.getElementById('product-list');
    const sortSelect = document.getElementById('sort');

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            displayProducts(data);
            sortSelect.addEventListener('change', () => sortProducts(data));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>Username: ${product.username}</p>
                <p>Email: ${product.email}</p>
            `;
            productList.appendChild(productItem);
        });
    }

    function sortProducts(products) {
        const criteria = sortSelect.value;
        const sortedProducts = [...products].sort((a, b) => {
            if (a[criteria] < b[criteria]) return -1;
            if (a[criteria] > b[criteria]) return 1;
            return 0;
        });
        displayProducts(sortedProducts);
    }

    fetchData();
});
