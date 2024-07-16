import { object } from "prop-types"
import React from "react"
import MovieService from "../../services/movie-service"
import Error from "../error/error"
import Spinner from "../spinner/spinner"
import "./hero.scss"
class Hero extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			movie: {},
			loading: true,
			error: false,
		}
		this.movieService = new MovieService()
	}

	componentDidMount() {
		this.updateMovie()
	}

	updateMovie = () => {
		this.setState({ loading: true })

		this.movieService
			.getRandomMovie()
			.then(res => this.setState({ movie: res }))
			.catch(() => this.setState({ error: true }))
			.finally(() => this.setState({ loading: false }))
	}

	render() {
		const { movie, loading, error } = this.state

		const errorContent = error ? <Error /> : null
		const loadingContent = loading ? <Spinner /> : null
		const content = !(error || loading) ? <Content movie={movie} /> : null

		return (
			<div className='hero'>
				<div className='hero__info'>
					<h2>FIND MOVIES</h2>
					<h1>TV shows and more</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
						debitis non eius ducimus delectus. Vitae expedita omnis, ad sequi
						perspiciatis fugit inventore ex magnam? Ea est non suscipit ipsa ut.
					</p>
					<div>
						<button className='btn btn-primary'>Details</button>
						<button className='btn btn-secondary' onClick={this.updateMovie}>
							Random Movie
						</button>
					</div>
				</div>
				<div className='hero__movie'>
					{errorContent}
					{loadingContent}
					{content}
				</div>
			</div>
		)
	}
}

export default Hero

const Content = ({ movie }) => {
	return (
		<>
			<img src={movie.thumnail} alt='img' />
			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description && movie.description.length >= 200
						? `${movie.description.slice(0, 100)}...`
						: movie.description}
				</p>
				<button className='btn btn-primary'>Details</button>
			</div>
		</>
	)
}

Content.propTypes = {
	movie: object,
}
