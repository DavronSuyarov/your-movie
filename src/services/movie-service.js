class MovieService {
	_apiBase = "https://api.themoviedb.org/3"
	_apiLng = "language=en-US"
	_apiKey = "api_key=574757d6c79ed5db0a6b6fc3da20c8f3"
	_apiImg = "https://image.tmdb.org/t/p/original"
	_apiPage = 1

	getResource = async url => {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Could not fetch${url}, status: ${response.status}`)
		}
		return await response.json()
	}
	getPopularMovies = async () => {
		return this.getResource(
			`${this._apiBase}/movie/popular?${this._apiLng}&${this._apiKey}`
		)
	}
	getTrandingMovies = async (page = this._apiPage) => {
		const responce = await this.getResource(
			`${this._apiBase}/movie/top_rated?${this._apiLng}&page=${page}&${this._apiKey}`
		)
		const movies = responce.results
		// console.log(movies)
		return movies && movies.map(movie => this._transformMovie(movie))
	}
	getDetailedMovie = async id => {
		const movie = await this.getResource(
			`${this._apiBase}/movie/${id}?${this._apiLng}&${this._apiKey}`
		)
		return this._transformMovie(movie)
	}
	getRandomMovie = async () => {
		const res = await this.getPopularMovies()
		const movie = res.results[Math.floor(Math.random() * res.results.length)]
		return this._transformMovie(movie)
	}

	_transformMovie = movie => {
		return {
			name: movie.original_title,
			description: movie.overview,
			thumnail: `${this._apiImg}${movie.poster_path}`,
			id: movie.id,
			release_date: movie.release_date,
			vote_average: movie.vote_average,
		}
	}
}

export default MovieService
