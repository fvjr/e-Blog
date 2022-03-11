const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//one post belongs to one user
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//users can have many posts
User.hasMany(Post, {
  foreignKey: 'user_id',
});

//one comment belongs to one post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

//posts can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

//one comment belongs to one user THROUGH post
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  through: Post,
});

//users can have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
});

module.exports = { User, Post, Comment };
