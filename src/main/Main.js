import React from 'react';
import NewsItem from './components/NewsItem';
import SourceButton from "./components/SourceButton";
import LoadMoreButton from './components/LoadMoreButton';
import SearchBar from './components/SearchBar';
import Header from './components/Header';

export default class Main extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            sources: [],
            news: [],
            currentSource: '',
            currentQuery: '',
            currentPage: 1,
            btnLoadHide: true,
            errorBlockHide: false
        }
        this.filterClick = this.filterClick.bind(this);
        this.loadMoreClick = this.loadMoreClick.bind(this);
        this.sourceClick = this.sourceClick.bind(this);
    }

    componentDidMount(){
        this.loadNews();
        this.loadSources();
    }

    loadMoreClick() {
        this.setState({currentPage: this.state.currentPage + 1}, () => {
            this.loadNews();
        })
    }

    filterClick() {
        const filterInput = document.querySelector('#search-field');
        this.setState({currentPage: 1, currentQuery: filterInput.value, currentSource: ''}, () => {
            this.loadNews()
        })
    }

    setNews(news) {
        let newsCount = this.state.currentPage * 5 - news.length;
        if (newsCount > 0 || news.length >= 40) {
            this.setState({btnLoadHide: true});
            if (newsCount === this.state.currentPage * 5) {
                this.setState({errorBlockHide: true});
            } else
                this.setState({errorBlockHide: false});
        } else {
            this.setState({btnLoadHide: false, errorBlockHide: false});
        }
        let loadedNews = [];
        news.forEach((item) => 
            loadedNews.push(<NewsItem item={item}/>));
        this.setState({news: loadedNews});
        this.render();
    }

    setSources(sources) {
        let loadedSources = [];
        sources.forEach((item) => loadedSources.push(<SourceButton sourcesItem={item} id={item.id}
                                                                   onClickFunc={this.sourceClick}/>));
        this.setState({sources: loadedSources})
    }

    loadNews() {
        this.state.news = [];
        let currentNewsCounter = this.state.currentPage * 5;

        let currentUrl = 'https://newsapi.org/v2/top-headlines?' +
            `country=us&sources=${this.state.currentSource}&q=${this.state.currentQuery}&` +
            `pageSize=${currentNewsCounter}&page=1&apiKey=ad019e5852754e32813188236a68f40c`;
        const request = new Request(currentUrl);
        fetch(request)
            .then(function (response) {
                return response.json();
            })
            .then((data) => this.setNews(data.articles));

    }

    loadSources() {
        const url = 'https://newsapi.org/v2/sources?apiKey=ad019e5852754e32813188236a68f40c';
        const request = new Request(url);
        fetch(request)
            .then(function (response) {
                return response.json();
            })
            .then((data) => this.setSources(data.sources));
    }

    sourceClick(id) {
        this.setState({currentSource: id, currentPage: 1, currentQuery: ''}, () => {
            this.loadNews()
        });
        const filterInput = document.querySelector('#search-field');
        filterInput.value = '';
        this.render();
    }

    render() {
        return (
            <React.Fragment>
                <Header onKeyUp = {this.handleKeyUp} onClick = {this.filterClick.bind(this)}/>
                <main className="main">
                    <div className="bottom-line">
                        <p></p>
                    </div>
                
                    <section className="content-sources" id="resources">
                        {this.state.sources}
                    </section>

                    <section className="current-source-block" id="current-source-block">
                       <h2 id="current-source-text">{this.state.currentSource}</h2>
                    </section>
                    
                    <section className="not-found-block" id="not-found-block">
                        <h2 className="content-error" id="error-block" hidden={!this.state.errorBlockHide}>
                            There are no articles matching your request</h2>
                    </section>

                    <section className="content-news" id="news">
                        {this.state.news}
                    </section>

                    <div className="loading">
                        <LoadMoreButton hidden={this.state.btnLoadHide} onClick={this.loadMoreClick.bind(this)}/>
                    </div>
                </main>
            </React.Fragment>
        );
    }

}
