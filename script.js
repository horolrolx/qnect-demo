// 샘플 메뉴 데이터
const menuItems = [
    { id: 1, name: "불고기 버거", price: 8000, category: "main", image: "burger.jpg", description: "소고기 패티와 특제 소스" },
    { id: 2, name: "치즈 버거", price: 7000, category: "main", image: "cheeseburger.jpg", description: "풍부한 치즈" },
    { id: 3, name: "감자 튀김", price: 3000, category: "side", image: "fries.jpg", description: "바삭한 감자 튀김" },
    { id: 4, name: "콜라", price: 2000, category: "drink", image: "cola.jpg", description: "시원한 음료" },
    { id: 5, name: "아이스티", price: 2500, category: "drink", image: "icetea.jpg", description: "달콤한 아이스티" }
];

// 페이지 로드시 실행
document.addEventListener('DOMContentLoaded', function() {
    // URL에서 테이블 번호 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const tableNumber = urlParams.get('table') || '1';
    
    document.getElementById('table-number').textContent = tableNumber;
    
    // 메뉴 표시
    displayMenuItems('all');
    
    // 카테고리 버튼 이벤트 리스너
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            displayMenuItems(this.dataset.category);
        });
    });
    
    // 장바구니 개수 표시
    updateCartCount();
});

// 메뉴 아이템 표시
function displayMenuItems(category) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.innerHTML = `
            <div class="menu-image">
                <img src="images/${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="menu-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">${item.price.toLocaleString()}원</p>
                <button onclick="addToCart(${item.id})">담기</button>
            </div>
        `;
        menuContainer.appendChild(itemElement);
    });
}

// 장바구니에 추가
function addToCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tableNumber = document.getElementById('table-number').textContent;
    
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            tableNumber: tableNumber
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // 알림 표시
    alert(`${item.name}이(가) 장바구니에 추가되었습니다.`);
}

// 장바구니 개수 표시
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}