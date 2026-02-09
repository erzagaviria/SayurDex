/* ========================================
   DayNight Admin - JavaScript
   ======================================== */
   
/*

TemplateMo 608 DayNight Admin

https://templatemo.com/tm-608-daynight-admin

*/

// ===== Theme Toggle =====
function initTheme() {
    const savedTheme = localStorage.getItem('daynight-theme');
    if (savedTheme === 'carbon') {
        document.documentElement.classList.add('carbon');
        document.body.classList.add('carbon');
        updateThemeButtons('carbon');
    } else {
        updateThemeButtons('snow');
    }
}

function setTheme(theme) {
    if (theme === 'carbon') {
        document.documentElement.classList.add('carbon');
        document.body.classList.add('carbon');
        localStorage.setItem('daynight-theme', 'carbon');
    } else {
        document.documentElement.classList.remove('carbon');
        document.body.classList.remove('carbon');
        localStorage.setItem('daynight-theme', 'snow');
    }
    updateThemeButtons(theme);
}

function updateThemeButtons(theme) {
    const snowBtns = document.querySelectorAll('.theme-btn-snow');
    const carbonBtns = document.querySelectorAll('.theme-btn-carbon');
    
    snowBtns.forEach(btn => {
        btn.classList.toggle('active', theme === 'snow');
    });
    carbonBtns.forEach(btn => {
        btn.classList.toggle('active', theme === 'carbon');
    });
}

// ===== Time-based Greeting =====
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

function setGreeting() {
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        greetingEl.textContent = getGreeting() + ', Gav';
    }
}

// ===== Date Range Picker =====
function setDateRange(range, btn) {
    const btns = document.querySelectorAll('.date-btn');
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update charts based on range
    updateCharts(range);
}

function updateCharts(range) {
    // Animate chart bars based on selected range
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const currentHeight = parseInt(bar.style.height);
        let multiplier = 1;
        
        if (range === '7d') multiplier = 0.7;
        if (range === '30d') multiplier = 1;
        if (range === '90d') multiplier = 1.2;
        if (range === '12m') multiplier = 1.4;
        
        // Random variation
        const variation = 0.8 + Math.random() * 0.4;
        bar.style.height = (currentHeight * multiplier * variation) + 'px';
    });
}

// ===== Inbox =====
function selectMessage(el, index) {
    // Remove active from all
    document.querySelectorAll('.message-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active to selected
    el.classList.add('active');
    el.classList.remove('unread');
    
    // Update message view
    updateMessageView(index);
}

function updateMessageView(index) {
    const messages = [
        {
            subject: 'Penawaran Harga Cabai Rawit Merah (Update Sore)',
            sender: 'Pak Budi Santoso',
            email: 'juragan.cabai88@gmail.com',
            date: '2 Feb 2026, 09:45 WIB',
            body: `<p>Halo Gan Gav,</p>
                   <p>Mau info nih, stok <strong>Cabai Rawit Merah</strong> baru turun dari petani Magelang pagi ini. Kualitas super pedas, warna cerah, cocok banget buat stok restoran atau dijual lagi.</p>
                   <p>Berikut penawaran spesial buat langganan hari ini:</p>
                   <p>• <strong>Harga Normal:</strong> Rp 65.000 / kg<br>
                   • <strong>Harga Ambil > 20kg:</strong> Rp 60.000 / kg<br>
                   • <strong>Harga Ambil > 50kg:</strong> Rp 55.000 / kg (Best Price!)</p>
                   <p>Stok cuma ada 200kg hari ini, siapa cepat dia dapat ya Gan. Kalau deal, siang ini bisa langsung saya kirim pakai pickup.</p>
                   <p>Gimana? Bungkus berapa kilo?</p>
                   <p>Salam,<br>Pak Budi (Juragan Cabai)</p>`
        },
        // Index 1: Bu Sri (Kentang)
        {
            subject: 'Stok Kentang & Wortel Lokal',
            sender: 'Bu Sri (Lapak Sayur)',
            email: 'sri.rejeki@pasarinduk.com',
            date: '2 Feb 2026, 08:00 WIB',
            body: `<p>Selamat Pagi Mas Admin,</p>
                   <p>Baru masuk nih <strong>Kentang Dieng Super</strong> (ukuran jumbo) dan Wortel Brastagi. Kualitas grade A semua, tanahnya sudah bersih, siap masuk supermarket.</p>
                   <p>Stok hari ini melimpah:</p>
                   <p>• Kentang: Ready 500kg<br>
                   • Wortel: Ready 300kg</p>
                   <p>Kalau Mas Gav ambil paket 1 kwintal (campur), saya kasih diskon spesial 5% + bonus Daun Bawang 2kg. Bisa dikirim siang ini barengan sama pesanan Bu Haji sebelah.</p>
                   <p>Ditunggu orderannya ya Mas,</p>
                   <p>Bu Sri</p>`
        },
        // Index 2: Kang Asep (Sawi)
        {
            subject: 'Update Pengiriman Sawi Hijau',
            sender: 'Kang Asep (Petani Lembang)',
            email: 'asep.lembang@farm.id',
            date: '1 Feb 2026, 16:30 WIB',
            body: `<p>Punten Kang,</p>
                   <p>Mau ngabarin soal pengiriman <strong>Sawi Hijau & Caisim</strong> untuk stok besok pagi.</p>
                   <p>Tadi di jalan Setiabudi macet parah ada perbaikan jalan, jadi pickup mungkin baru sampai gudang Akang agak telat, sekitar jam 5 sore ya.</p>
                   <p>Tapi tenang Kang, sayur sudah saya kasih es batu biar tetap segar dan tidak layu sampai tujuan. Nanti supir saya, Mang Ujang, yang bongkar muat.</p>
                   <p>Hampura pisan nya Kang atas keterlambatannya.</p>
                   <p>Nuhun,<br>Kang Asep</p>`
        }
    ];
    
    const msg = messages[index] || messages[0];
    
    document.querySelector('.message-view-subject').textContent = msg.subject;
    document.querySelector('.message-view-sender-name').textContent = msg.sender;
    document.querySelector('.message-view-sender-email').textContent = msg.email;
    document.querySelector('.message-view-date').textContent = msg.date;
    document.querySelector('.message-view-body').innerHTML = msg.body;
}

// ===== Kanban =====
function initKanban() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-cards');
    
    cards.forEach(card => {
        card.setAttribute('draggable', true);
        
        card.addEventListener('dragstart', (e) => {
            card.classList.add('dragging');
        });
        
        card.addEventListener('dragend', (e) => {
            card.classList.remove('dragging');
        });
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            column.appendChild(dragging);
        });
    });
}

// ===== Settings Toggles =====
function initToggles() {
    const toggles = document.querySelectorAll('.toggle input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            console.log(`${this.id} is now ${this.checked ? 'enabled' : 'disabled'}`);
        });
    });
}

// ===== Mobile Menu =====
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (menu && overlay) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (menu && overlay) {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    setGreeting();
    
    if (document.querySelector('.kanban-board')) {
        initKanban();
    }
    
    if (document.querySelector('.toggle')) {
        initToggles();
    }
    
    // Close mobile menu on overlay click
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
});
