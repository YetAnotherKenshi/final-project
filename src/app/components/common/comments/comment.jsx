import React from 'react';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../store/users';
import { displayDate } from '../../../utils/displayDate';

const Comment = ({
	content,
	userId,
	created_at: createTime,
	onRemove,
	_id: id,
}) => {
	const user = useSelector(getUserById(userId));
	console.log(user);
	return (
		<div className="bg-neutral-50 p-8 mt-4 rounded-md">
			<div className="flex justify-between items-center">
				<div>
					<div className="flex items-center gap-2">
						<p className="text-2xl">{user.name} </p>
						<p className="text-md">★★★★★ 1</p>
					</div>
					<p className="text-md">{displayDate(createTime)}</p>
					<p className="mt-4 text-lg">{content}</p>
				</div>
				<button
					className="w-10 h-10 bg-black"
					onClick={() => onRemove(id)}
				></button>
			</div>
		</div>
	);
};

export default Comment;
