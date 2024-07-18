import PropTypes, { number } from "prop-types"
import { useEffect, useState } from "react"
import MovieService from "../../services/movie-service"
import Error from "../error/error"
import Spinner from "../spinner/spinner"
import "./movie-info.scss"

const MovieInfo = ({ movieId }) => {
	const [movie, setMovie] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const movieService = new MovieService()

	useEffect(() => {
		updateMovie()
	}, [movieId])

	const updateMovie = () => {
		if (!movieId) {
			return
		}

		// this.setState({ loading: true })

		movieService
			.getDetailedMovie(movieId)
			.then(res => setMovie(res))
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(error || loading) ? <Content movie={movie} /> : null
	return (
		<div className='movieinfo'>
			{errorContent}
			{loadingContent}
			{content}
		</div>
	)
}
MovieInfo.propTypes = {
	movieId: number,
}

export default MovieInfo

const Content = ({ movie }) => {
	return (
		<>
			<img src={movie.thumnail} alt='img' />
			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description.length > 130
						? `${movie.description.slice(0, 130)}...`
						: movie.description}
				</p>
			</div>
		</>
	)
}

Content.propTypes = {
	movie: PropTypes.object,
}
