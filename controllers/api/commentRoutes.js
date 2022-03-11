const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//http://localhost:3001/api/comments/
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// http://localhost:3001/api/comments/:id
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/comments/
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:3001/api/comments/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      {
        content: req.body.content,
        updatedAt: req.body.updatedAt,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// http://localhost:3001/api/comments/:id
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this ID.' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
