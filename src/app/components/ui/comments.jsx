import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	createComment,
	getComments,
	loadCommentsList,
	removeComment,
} from '../../store/comments';
import AddCommentForm from '../common/comments/addCommentForm';
import CommentsList from '../common/comments/commentsList';
import { orderBy } from 'lodash';

const Comments = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const { productId } = params;
	useEffect(() => {
		dispatch(loadCommentsList(productId));
	}, [productId]);
	const comments = useSelector(getComments());
	const handleSubmit = (data) => {
		dispatch(createComment({ ...data, productId }));
	};
	const handleRemoveComment = (id) => {
		dispatch(removeComment(id));
	};
	const sortedComments = orderBy(comments, ['created_at'], ['desc']);
	return (
		<div className="bg-white mt-8 mb-8 rounded-lg py-10 px-12">
			<p className="text-3xl">Отзывы</p>
			<AddCommentForm onSubmit={handleSubmit} />
			<CommentsList comments={sortedComments} onRemove={handleRemoveComment} />
		</div>
	);
};

export default Comments;
