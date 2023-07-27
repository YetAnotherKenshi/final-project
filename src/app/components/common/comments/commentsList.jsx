import React from 'react';
import Comment from './comment';

const CommentsList = ({ comments, onRemove }) => {
	return comments.map((comment) => (
		<Comment {...comment} onRemove={onRemove} />
	));
};

export default CommentsList;
