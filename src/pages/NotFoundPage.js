import { Link } from "react-router-dom";
export function NotFoundPage() {
	return (<div>
		<p>Not Found</p>
		<Link to="/">Go Home</Link>
	</div>);
}