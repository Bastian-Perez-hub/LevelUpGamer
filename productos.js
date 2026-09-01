const products = [
    { code: 'JM001', name: 'Catan', price: 29990, desc: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse.', img: 'img/JM001.png' },
    { code: 'JM002', name: 'Carcassonne', price: 24990, desc: 'Juego de colocación de fichas donde los jugadores construyen el paisaje medieval.', img: 'img/JM002.png' },
    { code: 'AC001', name: 'Controlador Inalámbrico Xbox Series X', price: 59990, desc: 'Ofrece una experiencia cómoda con botones mapeables y respuesta táctil.', img: 'img/AC001.png' },
    { code: 'AC002', name: 'Auriculares Gamer HyperX Cloud II', price: 79990, desc: 'Sonido envolvente de calidad con micrófono desmontable y almohadillas viscoelásticas.', img: 'img/AC002.png' },
    { code: 'CO001', name: 'PlayStation 5', price: 549990, desc: 'Consola de última generación con gráficos impresionantes y tiempos de carga ultrarrápidos.', img: 'img/CO001.png' },
    { code: 'CG001', name: 'PC Gamer ASUS ROG Strix', price: 1299990, desc: 'Potente equipo para gamers exigentes, equipado con los últimos componentes.', img: 'img/CG001.png' },
    { code: 'SG001', name: 'Silla Gamer Secretlab Titan', price: 349990, desc: 'Diseñada para el máximo confort con soporte ergonómico y personalización ajustable.', img: 'img/SG001.png' },
    { code: 'MS001', name: 'Mouse Gamer Logitech G502 HERO', price: 49990, desc: 'Sensor de alta precisión y botones personalizables para un control preciso.', img: 'img/MS001.png' },
    { code: 'MP001', name: 'Mousepad Razer Goliathus Extended Chroma', price: 29990, desc: 'Área de juego amplia con iluminación RGB personalizable y superficie suave.', img: 'img/MP001.png' },
    { code: 'PP001', name: 'Polera Gamer Personalizada "Level-Up"', price: 14990, desc: 'Camiseta cómoda y estilizada con opción de personalización con tu gamer tag.', img: 'img/PP001.png' }
];
 
function renderProducts() {
    const grid = document.getElementById('product-grid');
    let html = '';
 
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        html += '<div class="product-card">';
        html += '<img src="' + p.img + '" alt="' + p.name + '" class="product-img">';
        html += '<h3>' + p.name + '</h3>';
        html += '<p class="product-desc">' + p.desc + '</p>';
        html += '<p class="product-price">$' + p.price.toLocaleString('es-CL') + ' CLP</p>';
        html += '<button class="btn" onclick="addToCart(\'' + p.code + '\', \'' + p.name + '\', ' + p.price + ')">Agregar al Carrito</button>';
        html += '</div>';
    }
 
    grid.innerHTML = html;
}
 
function addToCart(code, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let encontrado = false;
 
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].code === code) {
            cart[i].quantity = cart[i].quantity + 1;
            encontrado = true;
            break;
        }
    }
 
    if (!encontrado) {
        cart.push({ code: code, name: name, price: price, quantity: 1 });
    }
 
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}
 
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
 
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].quantity;
    }
 
    document.getElementById('cart-count').textContent = total;
}
 
document.addEventListener('DOMContentLoaded', function () {
    renderProducts();
    updateCartCounter();
});
 