import Comment from '../../models/Comment.js';

export const commentResolvers = {
  Query: {
    getComments: async (_, { eventId }) => {
      return await Comment.find({ eventId }).populate('user');
    },
  },
  Mutation: {
    createComment: async (_, {input }, { user }) => {
      console
      if (!user) throw new Error('Not authenticated');
      try {
          const newComment = await Comment.create({
              ...input,
              user: user.id,
              createdAt: new Date().toISOString(),
          });
          return await newComment.populate('user');
          } 
          catch (error) {
          throw new Error('Failed to create comment: ' + error.message);
          }
  },
  deleteComment: async (_, { id }, { user }) => {
    if (!user) throw new Error("Not authenticated");
  
    const comment = await Comment.findById(id);
    if (!comment) throw new Error("Comment not found");
  
    if (comment.user.toString() !== user.id) {
      throw new Error("Not authorized to delete this comment");
    }
  
    await Comment.findByIdAndDelete(id);
    return true;
  }
  },
};