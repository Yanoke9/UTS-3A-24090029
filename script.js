//========================================================
// I. DATA DUMMY (Digunakan oleh Dashboard dan Produk)
//========================================================

// Data Summary untuk Halaman Dashboard
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

//========================================================
// II. Fungsionalitas Halaman Login (index.html)
//========================================================

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form melakukan submit default

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim(); // Ini adalah NIM
        const errorMsg = document.getElementById('errorMessage');

        // 1. Validasi bahwa email dan password tidak boleh kosong 
        if (email === '' || password === '') {
            // 2. Jika kosong → tampilkan pesan error [cite: 39]
            errorMsg.textContent = '⚠️ Email dan Password (NIM) tidak boleh kosong.';
            return;
        }

        // 3. Jika semua terisi [cite: 40]
        errorMsg.textContent = ''; // Hapus pesan error jika ada
        alert('Login berhasil! Selamat datang.'); 
        
        // Redirect ke dashboard.html 
        window.location.href = 'dashboard.html';
    });
}

//========================================================
// III. Fungsionalitas Halaman Dashboard (dashboard.html)
//========================================================

function loadDashboardData() {
    // Memastikan kita berada di halaman dashboard sebelum memanipulasi DOM
    if (document.title.includes('Dashboard')) {
        const totalProductsEl = document.getElementById('totalProducts');
        const totalSalesEl = document.getElementById('totalSales');
        const totalRevenueEl = document.getElementById('totalRevenue');

        if (totalProductsEl) {
            // Menampilkan data summary dari object 
            totalProductsEl.textContent = summary.totalProducts; // 120
            totalSalesEl.textContent = summary.totalSales; // 85
            
            // Format dan tampilkan Total Revenue [cite: 64]
            totalRevenueEl.textContent = formatRupiah(summary.totalRevenue); 
        }
    }
}

// Memanggil fungsi saat halaman dashboard dimuat2
function loadProductsTable() {
    const tableBody = document.getElementById('productsTableBody');
    if (!tableBody || !document.title.includes('List Data Produk')) return;

    // Bersihkan isi tabel sebelum diisi
    tableBody.innerHTML = ''; 

    // Menggunakan forEach() untuk menampilkan data produk ke dalam tabel [cite: 85]
    products.forEach((product, index) => {
        // Buat baris baru (<tr>)
        const row = tableBody.insertRow();
        row.id = `product-row-${product.id}`; // Tambahkan ID untuk memudahkan penghapusan

        // Kolom No
        row.insertCell().textContent = index + 1;

        // Kolom Product Name
        row.insertCell().textContent = product.name;

        // Kolom Price (Format Rupiah)
        row.insertCell().textContent = formatRupiah(product.price);

        // Kolom Stock
        row.insertCell().textContent = product.stock;

        // Kolom Aksi
        const actionCell = row.insertCell();
        
        // --- Tombol Edit ---
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'action-btn edit';
        editBtn.onclick = () => {
            // Tampilkan alert: Edit produk (nama produk) [cite: 86]
            alert(`Edit produk (${product.name})`); 
        };
        actionCell.appendChild(editBtn);

        // --- Tombol Delete ---
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'action-btn delete';
        deleteBtn.onclick = () => {
            // Tambahkan konfirmasi hapus 
            if (confirm(`Yakin hapus produk ${product.name} ini?`)) { 
                // Hapus baris produk dari tabel dengan DOM (remove() method) 
                
                // 1. Hapus baris dari DOM
                const rowToDelete = document.getElementById(`product-row-${product.id}`);
                if (rowToDelete) {
                    rowToDelete.remove(); 
                }

                // 2. Hapus object dari array 'products' 
                //    (Ini penting agar data tidak muncul lagi saat fungsi dipanggil ulang)
                products = products.filter(p => p.id !== product.id);

                // Catatan: Anda perlu memanggil ulang loadProductsTable() jika ingin
                // mengupdate ulang nomor urut (No) setelah penghapusan.
                // loadProductsTable(); 
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


// Memanggil fungsi saat halaman produk dimuat
loadProductsTable();