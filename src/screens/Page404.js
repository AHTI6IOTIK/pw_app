import React from 'react';
import {Link} from "react-router-dom";

const Page404 = ({location}) => {

	return <div>
		<p>Page {location.pathname} Not Found</p>
		<p>
			Go to <Link to={'/'}>home</Link> page or <Link to={'/auth'}>auth</Link>
		</p>
	</div>;
};

export default Page404;