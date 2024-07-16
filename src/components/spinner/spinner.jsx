import PropTypes from "prop-types"
import "./spinner.scss"

const Spinner = ({ width = "0px" }) => {
	return (
		<div className='center'>
			<div className='loader' style={{ width }} />
		</div>
	)
}

Spinner.propTypes = {
	width: PropTypes.number,
}

export default Spinner
