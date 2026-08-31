const products = [
    { code: 'JM001', name: 'Catan', price: 29990, desc: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse.' },
    { code: 'JM002', name: 'Carcassonne', price: 24990, desc: 'Juego de colocación de fichas donde los jugadores construyen el paisaje medieval.' },
    { code: 'AC001', name: 'Controlador Inalámbrico Xbox Series X', price: 59990, desc: 'Ofrece una experiencia cómoda con botones mapeables y respuesta táctil.' },
    { code: 'AC002', name: 'Auriculares Gamer HyperX Cloud II', price: 79990, desc: 'Sonido envolvente de calidad con micrófono desmontable y almohadillas viscoelásticas.' },
    { code: 'CO001', name: 'PlayStation 5', price: 549990, desc: 'Consola de última generación con gráficos impresionantes y tiempos de carga ultrarrápidos.' },
    { code: 'CG001', name: 'PC Gamer ASUS ROG Strix', price: 1299990, desc: 'Potente equipo para gamers exigentes, equipado con los últimos componentes.' },
    { code: 'SG001', name: 'Silla Gamer Secretlab Titan', price: 349990, desc: 'Diseñada para el máximo confort con soporte ergonómico y personalización ajustable.' },
    { code: 'MS001', name: 'Mouse Gamer Logitech G502 HERO', price: 49990, desc: 'Sensor de alta precisión y botones personalizables para un control preciso.' },
    { code: 'MP001', name: 'Mousepad Razer Goliathus Extended Chroma', price: 29990, desc: 'Área de juego amplia con iluminación RGB personalizable y superficie suave.' },
    { code: 'PP001', name: 'Polera Gamer Personalizada "Level-Up"', price: 14990, desc: 'Camiseta cómoda y estilizada con opción de personalización con tu gamer tag.' }
];

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    grid.innerHTML = products.map(p => `
        <div class="product-card" style="background: #111; padding: 1rem; border-radius: 8px; border: 1px solid #1E90FF; margin: 10px;">
            <h3 style="color: #1E90FF;">${p.name}</h3>
            <p style="color: #D3D3D3; margin: 0.5rem 0;">${p.desc}</p>
            <p style="font-weight: bold; color: #39FF14; margin-bottom: 1rem;">$${p.price.toLocaleString('es-CL')} CLP</p>
            <button class="btn" onclick="addToCart('${p.code}', '${p.name}', ${p.price})">Agregar al Carrito</button>
        </div>
    `).join('');
}

function addToCart(code, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.code === code);
    
    if (index > -1) {
        cart[index].quantity += 1;
    } else {
        cart.push({ code, name, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const counterEl = document.getElementById('cart-count');
    if (counterEl) {
        counterEl.textContent = totalItems;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCounter();
});