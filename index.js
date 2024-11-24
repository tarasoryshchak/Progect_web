const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Дані постів у пам'яті
let posts = [];

// Головна сторінка: список постів
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Форма для створення посту
app.get('/create', (req, res) => {
    res.render('create');
});

// Обробка створення посту
app.post('/create', (req, res) => {
    const { title, description, author } = req.body;
    posts.push({ id: Date.now(), title, description, author });
    res.redirect('/');
});

// Форма редагування посту
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render('edit', { post });
});

// Обробка редагування посту
app.post('/edit/:id', (req, res) => {
    const { title, description, author } = req.body;
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        post.title = title;
        post.description = description;
        post.author = author;
    }
    res.redirect('/');
});

// Видалення посту
app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
