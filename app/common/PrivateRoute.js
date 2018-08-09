import { withCookies } from 'react-cookie'

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
	  {...rest}
	  render={props =>
		props.cookie.get('phone') ? (
		  <Component {...props} />
		) : (
		  <Redirect
			to={{
			  pathname: "/login",
			  state: { from: props.location }
			}}
		  />
		)
	  }
	/>
);

export default withCookies(PrivateRoute);