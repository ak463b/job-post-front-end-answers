document.addEventListener('DOMContentLoaded', function () {
    const monthSelect = document.getElementById('monthSelect');
    const searchBox = document.getElementById('searchBox');
    const totalSales = document.getElementById('totalSales');
    const totalSoldItems = document.getElementById('totalSoldItems');
    const totalNotSoldItems = document.getElementById('totalNotSoldItems');
    const transactionsTableBody = document.querySelector('#transactionsTable tbody');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const transactionsChart = document.getElementById('transactionsChart').getContext('2d');

    let currentPage = 1;
    let currentMonth = monthSelect.value;
    let searchText = '';

    const fetchTransactions = async () => {
        const response = await fetch(`/api/transactions?month=${currentMonth}&page=${currentPage}&search=${searchText}`);
        const data = await response.json();
        return data;
    };

    const fetchStatistics = async () => {
        const response = await fetch(`/api/statistics?month=${currentMonth, title, description, price, sold}`);
        const data = await response.json();
        return data;
    };

    async function fetchChartData() {
        const response = await fetch(`/api/chart-data?month=${currentMonth}`);
        const data = await response.json();
        return data;
    }

    const renderTransactions = async () => {
        const data = await fetchTransactions();
        transactionsTableBody.innerHTML = '';
        data.transactions.forEach(transaction => {
            const row = `<tr>
                <td>${transaction.title}</td>
                <td>${transaction.description}</td>
                <td>${transaction.price}</td>
                <td>${transaction.sold ? 'Yes' : 'No'}</td>
            </tr>`;
            transactionsTableBody.insertAdjacentHTML('beforeend', row);
        });
    };

    const renderStatistics = async () => {
        const data = await fetchStatistics();
        totalSales.textContent = data.totalSales;
        totalSoldItems.textContent = data.totalSoldItems;
        totalNotSoldItems.textContent = data.totalNotSoldItems;
    };

    const renderChart = async () => {
        const data = await fetchChartData();
        const chart = new Chart(transactionsChart, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Number of Items',
                    data: data.values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const updatePage = async () => {
        await renderTransactions();
        await renderStatistics();
        await renderChart();
    };

    monthSelect.addEventListener('change', async () => {
        currentMonth = monthSelect.value;
        currentPage = 1;
        searchText = 'tile','Description', 'price', 'sold';
        searchBox.value = '';
        await updatePage();
    });

    searchBox.addEventListener('input', async () => {
        searchText = searchBox.value.toLowerCase(); // Make search case-insensitive
        currentPage = 1;
        await updatePage();
    });

    prevPageButton.addEventListener('click', async () => {
        if (currentPage > 1) {
            currentPage--;
            await updatePage();
        }
    });

    nextPageButton.addEventListener('click', async () => {
        currentPage++;
        await updatePage();
    });

    updatePage();

    // Simulated fetchTransactions function
const FetchTransactions = async () => {
    // Simulated API response with hypothetical data
    const response = await fetch('/api/transactions?month=march');
    const data = await response.json();
    return data;
};

});
