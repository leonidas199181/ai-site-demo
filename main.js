console.log("网站已加载");

// 页面加载时恢复本地保存的数据
const savedValue = localStorage.getItem('inputValue');
if (savedValue) {
    document.getElementById('inputField').value = savedValue;
}

document.getElementById('clickBtn').addEventListener('click', function() {
    // 创建toast提示
    const toast = document.createElement('div');
    toast.textContent = '点击成功啦';
    toast.style.position = 'fixed';
    toast.style.top = '50%';
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    toast.style.color = 'white';
    toast.style.padding = '10px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
    
    // 3秒后移除toast
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
});

// 保存按钮点击事件
document.getElementById('saveBtn').addEventListener('click', function() {
    const inputValue = document.getElementById('inputField').value.trim();
    
    // 校验输入框是否为空
    if (!inputValue) {
        const toast = document.createElement('div');
        toast.textContent = '请先完善内容';
        toast.style.position = 'fixed';
        toast.style.top = '50%';
        toast.style.left = '50%';
        toast.style.transform = 'translate(-50%, -50%)';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        toast.style.color = 'white';
        toast.style.padding = '10px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '1000';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 3000);
        return;
    }
    
    localStorage.setItem('inputValue', inputValue);
    
    // 显示保存成功提示
    const toast = document.createElement('div');
    toast.textContent = '保存成功';
    toast.style.position = 'fixed';
    toast.style.top = '50%';
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    toast.style.color = 'white';
    toast.style.padding = '10px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
    }, 3000);
});
