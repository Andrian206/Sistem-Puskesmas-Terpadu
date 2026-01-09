// ============================================
// KONFIGURASI SUPABASE
// ============================================
// Ganti dengan kredensial Supabase Anda
const SUPABASE_URL = 'https://arlgjiovhmeminsbpder.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybGdqaW92aG1lbWluc2JwZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1OTIwNjcsImV4cCI6MjA4MTE2ODA2N30.WSbx3URMrw9D4JN7HZIvNPGNw0ot9YAg5lHYjySmtfQ';

// Inisialisasi Supabase Client (gunakan var untuk menghindari redeclaration error)
var supabaseClient = window.supabaseClient || window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = supabaseClient;

// Alias untuk kemudahan penggunaan
var supabase = supabaseClient;

// ============================================
// FUNGSI HELPER GLOBAL
// ============================================

// Cek session login
async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

// Get current user
async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

// Get user role from profiles table
async function getUserRole() {
    const user = await getCurrentUser();
    if (!user) return null;
    
    const { data, error } = await supabase
        .from('users')
        .select('role, nama')
        .eq('id', user.id)
        .single();
    
    if (error) {
        console.error('Error getting user role:', error);
        return null;
    }
    return data;
}

// Logout function
async function logout() {
    await supabase.auth.signOut();
    window.location.href = '../index.html';
}

// Format tanggal Indonesia
function formatTanggal(dateString) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Format tanggal singkat
function formatTanggalSingkat(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID');
}

// Generate nomor antrean
function generateNomorAntrean(poli, nomor) {
    const kodePoliMap = {
        'Poli Umum': 'U',
        'Poli Gigi': 'G',
        'Poli KIA': 'K',
        'Poli Lansia': 'L'
    };
    const kode = kodePoliMap[poli] || 'X';
    return `${kode}-${String(nomor).padStart(3, '0')}`;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Loading spinner
function showLoading() {
    document.getElementById('loading-overlay')?.classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay')?.classList.add('hidden');
}

// Protect page - redirect if not logged in
async function protectPage(allowedRoles = []) {
    const session = await checkSession();
    if (!session) {
        window.location.href = '../index.html';
        return false;
    }
    
    if (allowedRoles.length > 0) {
        const userData = await getUserRole();
        if (!userData || !allowedRoles.includes(userData.role)) {
            alert('Anda tidak memiliki akses ke halaman ini');
            window.location.href = '../index.html';
            return false;
        }
    }
    return true;
}
