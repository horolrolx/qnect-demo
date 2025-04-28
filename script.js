// 샘플 메뉴 데이터 (확장)
const menuItems = [
    { 
        id: 1, 
        name: "시그니처 버거", 
        price: 12000, 
        category: "signature", 
        image: "burger-signature.jpg", 
        description: "매장 특제 소스와 신선한 재료로 만든 최고의 버거",
        ingredients: "소고기 패티, 베이컨, 치즈, 토마토, 양상추, 특제 소스",
        calories: 750,
        ratings: 4.8,
        reviewCount: 128
    },
    { 
        id: 2, 
        name: "더블 치즈 버거", 
        price: 10000, 
        category: "main", 
        image: "burger-cheese.jpg", 
        description: "두 장의 패티와 풍부한 치즈의 조화",
        ingredients: "소고기 패티 2장, 체다 치즈, 피클, 양파, 토마토 소스",
        calories: 820,
        ratings: 4.6,
        reviewCount: 95
    },
    { 
        id: 3, 
        name: "트러플 감자튀김", 
        price: 6000, 
        category: "side", 
        image: "fries-truffle.jpg", 
        description: "트러플 오일과 파마산 치즈를 곁들인 프리미엄 감자튀김",
        ingredients: "감자, 트러플 오일, 파마산 치즈, 파슬리, 소금",
        calories: 450,
        ratings: 4.7,
        reviewCount: 86
    },
    { 
        id: 4, 
        name: "수제 레몬에이드", 
        price: 5000, 
        category: "drink", 
        image: "lemonade.jpg", 
        description: "신선한 레몬으로 만든 상큼한 레몬에이드",
        ingredients: "레몬, 설탕, 탄산수, 민트",
        calories: 180,
        ratings: 4.5,
        reviewCount: 62
    },
    { 
        id: 5, 
        name: "아보카도 샐러드", 
        price: 9000, 
        category: "side", 
        image: "salad-avocado.jpg", 
        description: "신선한 아보카도와 다양한 채소로 만든 건강한 샐러드",
        ingredients: "아보카도, 방울토마토, 양상추, 적양파, 올리브 오일",
        calories: 320,
        ratings: 4.4,
        reviewCount: 73
    }
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

// 메뉴 아이템 표시 (상세 페이지 링크 추가)
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
            <div class="menu-image" onclick="location.href='menu-detail.html?id=${item.id}'">
                <img src="images/${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                <div class="rating">★ ${item.ratings.toFixed(1)} (${item.reviewCount})</div>
            </div>
            <div class="menu-details">
                <h3 onclick="location.href='menu-detail.html?id=${item.id}'">${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">${item.price.toLocaleString()}원</p>
                <button onclick="addToCart(${item.id})">담기</button>
            </div>
        `;
        menuContainer.appendChild(itemElement);
    });
}