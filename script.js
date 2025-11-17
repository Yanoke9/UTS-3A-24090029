//========================================================
// I. DATA DUMMY (Digunakan oleh Dashboard dan Produk)
//========================================================

const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000 
};

// Data Array of Object untuk Halaman List Data Produk
let products = [ // Menggunakan 'let' agar bisa dihapus
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20}
    // Tambahkan data produk lainnya sesuai kebutuhan
];

// Fungsi untuk memformat angka menjadi format Rupiah sederhana
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// II. Fungsionalitas Halaman Login (index.html)

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const correctEmail = "notzuardboah@gmail.com";
    const correctNIM = "24090029";

    if (email === correctEmail && password === correctNIM) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Email atau password (NIM) salah!");
    }
}

/* Protect pages from unauthorized access */
function protectPage() {
    const protectedPages = ["dashboard.html", "products.html"];
    const page = window.location.pathname.split("/").pop();

    if (protectedPages.includes(page)) {
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "index.html";
        }
    }
}
protectPage();
// III. Fungsionalitas Halaman Dashboard (dashboard.html)

function loadDashboardData() {

    if (document.title.includes('Dashboard')) {
        const totalProductsEl = document.getElementById('totalProducts');
        const totalSalesEl = document.getElementById('totalSales');
        const totalRevenueEl = document.getElementById('totalRevenue');

        if (totalProductsEl) {

            totalProductsEl.textContent = summary.totalProducts;
            totalSalesEl.textContent = summary.totalSales;
            totalRevenueEl.textContent = formatRupiah(summary.totalRevenue); 
        }
    }
}

function loadProductsTable() {
    const tableBody = document.getElementById('productsTableBody');
    if (!tableBody || !document.title.includes('List Data Produk')) return;

    tableBody.innerHTML = ''; 

    products.forEach((product, index) => {

        const row = tableBody.insertRow();
        row.id = `product-row-${product.id}`;
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = product.name;
        row.insertCell().textContent = formatRupiah(product.price);
        row.insertCell().textContent = product.stock;
        const actionCell = row.insertCell();
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'action-btn edit';
        editBtn.onclick = () => {
            alert(`Edit produk (${product.name})`); 
        };
        actionCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'action-btn delete';
        deleteBtn.onclick = () => {

            if (confirm(`Yakin hapus produk ${product.name} ini?`)) { 
    
                const rowToDelete = document.getElementById(`product-row-${product.id}`);
                if (rowToDelete) {
                    rowToDelete.remove(); 
                }

                products = products.filter(p => p.id !== product.id);
            }
        };
        actionCell.appendChild(deleteBtn);
    });
}

// ====== DASHBOARD LOADER ======
function loadDashboard() {
    if (!document.title.includes("Dashboard")) return;

    document.getElementById("totalProducts").textContent = summary.totalProducts;
    document.getElementById("totalSales").textContent = summary.totalSales;
    document.getElementById("totalRevenue").textContent = formatRupiah(summary.totalRevenue);

    document.getElementById("btnProducts").onclick = () => {
        window.location.href = "products.html";
    };
}

loadDashboard();

loadProductsTable();

// === AUTO ACTIVE SIDEBAR ===
(function setActiveSidebar() {
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-item").forEach(item => {
        const href = item.getAttribute("href");

        if (href === currentPage) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
})();

