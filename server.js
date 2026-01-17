const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS中间件
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// 中间件
app.use(bodyParser.json());
app.use(express.static('.'));

// 用户数据库文件路径
const usersFile = path.join(__dirname, 'users.json');

// 初始化用户数据库
function initializeUsers() {
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify([]));
    }
}

// 读取用户数据
function getUsers() {
    try {
        const data = fs.readFileSync(usersFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// 保存用户数据
function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// 验证用户名格式（英文和数字）
function isValidUsername(username) {
    return /^[a-zA-Z0-9]{3,20}$/.test(username);
}

// 注册API
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    // 验证输入
    if (!username || !password) {
        return res.json({ success: false, message: '用户名和密码不能为空' });
    }

    // 验证用户名格式
    if (!isValidUsername(username)) {
        return res.json({ success: false, message: '用户名必须是3-20位的英文和数字组合' });
    }

    // 验证密码长度
    if (password.length < 6) {
        return res.json({ success: false, message: '密码至少需要6位' });
    }

    const users = getUsers();

    // 检查用户名是否已存在
    if (users.find(u => u.username === username)) {
        return res.json({ success: false, message: '用户名已存在' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 添加新用户
    users.push({
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    });

    saveUsers(users);
    res.json({ success: true, message: '注册成功' });
});

// 登陆API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // 验证输入
    if (!username || !password) {
        return res.json({ success: false, message: '用户名和密码不能为空' });
    }

    const users = getUsers();
    const user = users.find(u => u.username === username);

    // 检查用户是否存在
    if (!user) {
        return res.json({ success: false, message: '登录失败' });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ success: false, message: '登录失败' });
    }

    res.json({ success: true, message: '登录成功' });
});

// 初始化并启动服务器
initializeUsers();
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
