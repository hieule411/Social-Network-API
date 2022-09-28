const {Thoughts, Users} = require('../models');

const ThoughtsControllers = {
    addThoughtsControllers({ params, body }, res) {
        console.log(params);
        Comment.create(body)
          .then(({ _id }) => {
            return Thoughts.findOneAndUpdate(
              { _id: params.thoughtId },
              { $push: { comments: _id } },
              { new: true }
            );
          })
          .then(dbThoughtsData => {
            console.log(dbThoughtsData);
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
      },
}

// add thoughts
addThoughts({ params, body }, res) 
    {
    Thoughts.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this particular id!' });
          return;
        }
        res.json(dbThouhtsData);
      })
      .catch(err => res.json(err));
  };

  // remove Thoughts
  removeThoughts({ params }, res) 
  {
    Thoughts.findOneAndDelete({ _id: params.commentId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return Thoughts.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  };

  // add Reaction
  addReaction({ params, body }, res) 
  {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  };

  //delete Reaction
  deleteReaction({ params }, res) 
  {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  };


module.exports = thoughtController;
