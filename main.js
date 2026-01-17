console.log("网站已加载");

// 设置API基础URL（根据环境动态设置）
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://ai-site-demo-ehil.onrender.com';

console.log('API Base URL:', API_BASE_URL);

// 显示toast提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '50%';
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    toast.style.color = 'white';
    toast.style.padding = '15px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    toast.style.minWidth = '200px';
    toast.style.textAlign = 'center';
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
}

// 页面加载时恢复本地保存的数据
const savedValue = localStorage.getItem('inputValue');
if (savedValue) {
    document.getElementById('inputField').value = savedValue;
}

document.getElementById('clickBtn').addEventListener('click', function() {
    showToast('点击成功啦');
});

// 保存按钮点击事件
document.getElementById('saveBtn').addEventListener('click', function() {
    const inputValue = document.getElementById('inputField').value.trim();
    
    // 校验输入框是否为空
    if (!inputValue) {
        showToast('请先完善内容');
        return;
    }
    
    localStorage.setItem('inputValue', inputValue);
    showToast('保存成功');
});

// 注册按钮点击事件
document.getElementById('registerBtn').addEventListener('click', async function() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        showToast(result.message);

        if (result.success) {
            document.getElementById('registerUsername').value = '';
            document.getElementById('registerPassword').value = '';
        }
    } catch (error) {
        showToast('注册失败，请检查网络连接');
        console.error('注册错误:', error);
    }
});

// 登陆按钮点击事件
document.getElementById('loginBtn').addEventListener('click', async function() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        
        if (result.success) {
            showToast('登录成功');
            document.getElementById('loginUsername').value = '';
            document.getElementById('loginPassword').value = '';
        } else {
            showToast('登录失败');
        }
    } catch (error) {
        showToast('登录失败，请检查网络连接');
        console.error('登陆错误:', error);
    }
});
