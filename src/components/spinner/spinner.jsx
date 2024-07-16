import "./spinner.scss"

const Spinner = ({ width = "0px" }) => {
	return (
		<div className='center'>
			<div className='loader' style={{ width }} />
		</div>
	)
}

export default Spinner
