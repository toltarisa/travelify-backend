const Router = require('express');

const { commentService } = require('../service/commentService');
const requireAuth = require('../middleware/authMiddleware');
const { addComment, removeComment } = commentService;

const router = Router();

router.post('/:locationId/comments', requireAuth, addComment);
router.delete('/:locationId/comments/:commentId', requireAuth, removeComment);

module.exports = router;
