import React from 'react';

const UserItem = ({item, isLoading, status, btn}) => {

	return <div className={'usersList--item'}>
		<p>{item.name}</p>
		<p>status: {status}</p>
		<button onClick={() => btn.handler(item.id, item.blocked)}>{btn.title}</button>
	</div>
};

export default UserItem;