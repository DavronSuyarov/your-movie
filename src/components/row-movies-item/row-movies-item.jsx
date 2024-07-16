import "./row-movies-item.scss"

const RowMoviesItem = ({ movie, onOpen }) => {
	return (
		<div className='movieitem' onClick={() => onOpen(movie.id)}>
			<img src={movie.thumnail} alt={movie.title} />
			<h2>
				{movie.name.length > 17 ? `${movie.name.slice(0, 17)}...` : movie.name}
			</h2>
			<div className='movieitem-descr'>
				<img src='/public/date.svg' alt='date' />
				<p>{movie.release_date}</p>
				<div className='dot' />
				<p>{movie.vote_average.toFixed(1)}</p>
				<img src='/public/star.svg' alt='date' />
			</div>
		</div>
	)
}

export default RowMoviesItem
