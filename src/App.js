import React, {Component} from 'react';
import SearchBar from './components/search_bar';
import YTsearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCQ5bTQ_34RCmaYIgD8sJDpkh6-VfR7tog';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('React js');
	}

	videoSearch(searchTerm) {
		YTsearch({key: API_KEY, term: searchTerm}, data => {
			console.log(data);
			this.setState({
				videos: data,
				selectedVideo: data[0]
			});
		});
	}

	render() {
		return (
			<div className="main">
				<div className="search">
					<SearchBar
						onSearchTermChange={searchTerm => this.videoSearch(searchTerm)}
					/>
				</div>
				<div className="video-printed">
					<VideoDetail video={this.state.selectedVideo} />
					<VideoList
						onVideoSelect={userSelected =>
							this.setState({selectedVideo: userSelected})
						}
						videos={this.state.videos}
					/>
				</div>
			</div>
		);
	}
}

//export default {App};
