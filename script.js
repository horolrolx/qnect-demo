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

// 장바구니 관련 함수들
function addToCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = menuItems.find(item => item.id === itemId);
    
    if (item) {
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
                image: item.image
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showAddToCartMessage(item.name);
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

function showAddToCartMessage(itemName) {
    const message = document.createElement('div');
    message.className = 'add-to-cart-message';
    message.textContent = `${itemName}이(가) 장바구니에 담겼습니다.`;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// 챗봇 관련 함수들 수정
function toggleChatbot() {
    const chatbot = document.querySelector('.chatbot-container');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        chatbot.classList.toggle('active');
        chatbot.classList.toggle('collapsed');
    } else {
        chatbot.classList.toggle('collapsed');
        if (chatbot.classList.contains('collapsed')) {
            chatbot.style.height = '50px';
        } else {
            chatbot.style.height = 'auto';
        }
    }
}

// 모바일 환경에서 챗봇 외부 클릭 시 닫기
document.addEventListener('click', function(event) {
    const chatbot = document.querySelector('.chatbot-container');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && chatbot.classList.contains('active')) {
        const isClickInside = chatbot.contains(event.target);
        if (!isClickInside) {
            chatbot.classList.remove('active');
            chatbot.classList.add('collapsed');
        }
    }
});

// 화면 크기 변경 시 챗봇 상태 초기화
window.addEventListener('resize', function() {
    const chatbot = document.querySelector('.chatbot-container');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        chatbot.classList.remove('active');
        chatbot.classList.add('collapsed');
    } else {
        chatbot.classList.remove('active');
        chatbot.classList.remove('collapsed');
        chatbot.style.height = 'auto';
    }
});

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // 챗봇 응답 생성
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }
}

function addMessage(text, type) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateResponse(message) {
    // 날씨 관련 키워드
    const weatherKeywords = ['날씨', '비', '더워', '추워', '맑아'];
    // 기분 관련 키워드
    const moodKeywords = ['기분', '행복', '우울', '스트레스', '피곤'];
    // 인원 관련 키워드
    const peopleKeywords = ['혼자', '둘이', '세명', '네명', '다섯명'];
    
    // 날씨 체크
    const isWeather = weatherKeywords.some(keyword => message.includes(keyword));
    // 기분 체크
    const isMood = moodKeywords.some(keyword => message.includes(keyword));
    // 인원 체크
    const isPeople = peopleKeywords.some(keyword => message.includes(keyword));
    
    let recommendations = [];
    
    // 날씨 기반 추천
    if (isWeather) {
        if (message.includes('비')) {
            recommendations.push('비 오는 날에는 따뜻한 수프나 라면이 좋을 것 같아요.');
        } else if (message.includes('더워')) {
            recommendations.push('더운 날에는 시원한 샐러드나 레몬에이드가 좋을 것 같아요.');
        } else if (message.includes('추워')) {
            recommendations.push('추운 날에는 따뜻한 버거나 핫도그가 좋을 것 같아요.');
        }
    }
    
    // 기분 기반 추천
    if (isMood) {
        if (message.includes('행복')) {
            recommendations.push('기분이 좋으시다면 달콤한 디저트나 특별한 메뉴를 추천드려요.');
        } else if (message.includes('우울') || message.includes('스트레스')) {
            recommendations.push('기분이 좋지 않으시다면 편안한 음식이나 따뜻한 음료를 추천드려요.');
        }
    }
    
    // 인원 기반 추천
    if (isPeople) {
        if (message.includes('혼자')) {
            recommendations.push('혼자 드시기 좋은 사이드 메뉴나 음료를 추천드려요.');
        } else if (message.includes('둘이')) {
            recommendations.push('두 분이 함께 나누기 좋은 메인 메뉴와 사이드 메뉴를 추천드려요.');
        } else {
            recommendations.push('여러 분이 함께 나누기 좋은 메뉴들을 추천드려요.');
        }
    }
    
    // 기본 응답
    if (recommendations.length === 0) {
        return '죄송합니다. 더 자세한 정보를 알려주시면 더 좋은 추천을 해드릴 수 있어요. 날씨, 기분, 인원 등을 말씀해주세요.';
    }
    
    return recommendations.join(' ');
}

// Enter 키로 메시지 전송
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});