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
import { getProductById, updateProduct } from '../../store/products';

const Comments = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const { productId } = params;
	const product = useSelector(getProductById(productId));
	useEffect(() => {
		dispatch(loadCommentsList(productId));
	}, [productId]);
	const comments = useSelector(getComments());

	const handleSubmit = (data) => {
		dispatch(createComment({ ...data, productId }));
		const rating =
			comments.length + 1 > 0
				? (comments.map((c) => Number(c.rating)).reduce((r, v) => (v += r), 0) +
						Number(data.rating)) /
				  (comments.length + 1)
				: 0;
		dispatch(
			updateProduct({
				...product,
				rate: rating,
			})
		);
	};
	const handleRemoveComment = (id) => {
		const currentCommentRate = comments.find((c) => c._id === id).rating;
		const rating =
			comments.length - 1 > 0
				? (comments.map((c) => Number(c.rating)).reduce((r, v) => (v += r), 0) -
						currentCommentRate) /
				  (comments.length - 1)
				: 0;
		dispatch(
			updateProduct({
				...product,
				rate: rating,
			})
		);
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
