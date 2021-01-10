const Comment = require('../model/Comment');
const Location = require('../model/Location');

async function addComment(req, res) {
  const locationId = req.params.locationId;
  const { comment, username } = req.body;
  const newComment = new Comment({
    comment,
    username,
  });

  try {
    const docComment = await Comment.create(newComment);

    await Location.findByIdAndUpdate(
      locationId,
      { $push: { comments: docComment } },
      { new: true, useFindAndModify: false },
    );

    res.status(201).json({
      message: `comment created successfully for location with id:${locationId}`,
    });
  } catch (error) {
    res.status(400).send({
      error: "Couldn't create comment , please check your request payload",
    });
  }
}

async function removeComment(req, res) {
  const locationId = req.params.locationId;
  const commentId = req.params.commentId;

  try {
    await Comment.deleteOne({ _id: commentId }, async function (err) {
      if (err) res.json({ message: 'error occured while removing comment' });
      await Location.updateOne(
        { _id: locationId },
        { $pullAll: { comments: [commentId] } },
      );
      res.status(200).json({ message: 'ok' });
    });
  } catch (error) {
    res.status(400).json({
      message: "couldn't remove comment, please check request params",
    });
  }
}

exports.commentService = { addComment, removeComment };
