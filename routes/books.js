const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const authenticate = require('../middleware/auth');

router.get('/',authenticate, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { title, author, description } = req.body;
  const newBook = new Book({ title, author, description });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book = await Book.findByIdAndDelete(req.params.id);
    res.json({book, success: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
