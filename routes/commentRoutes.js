const Router = require('express');

const { commentController } = require('../controller/commentController');
const requireAuth = require('../middleware/authMiddleware');
const { addComment, removeComment } = commentController;

const router = Router();

router.post('/:locationId/comments', requireAuth, addComment);
router.delete('/:locationId/comments/:commentId', requireAuth, removeComment);

module.exports = router;
