const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//http://localhost:3001/api/posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/posts
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:3001/api/posts
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this ID.' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
