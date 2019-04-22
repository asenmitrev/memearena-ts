import React, { Component, Fragment, createRef } from 'react';
import '../styles/components/Home.scss';
import { connect } from 'react-redux';
import { getMemes } from '../actions';
import efgPic from '../img/efg-fighter.png';
import MemeCard from './MemeCard';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import { Icon } from 'semantic-ui-react';
import { Meme } from '../types';

interface StateProps {
    memes: Meme[]
}

interface DispatchProps {
    getMemes(): void
}

interface Props extends StateProps, DispatchProps {
}

class Home extends Component<Props> {
    private topMemes = createRef<HTMLDivElement>();
    componentWillMount() {
        this.props.getMemes();

        this.scrollDown = this.scrollDown.bind(this);
    }

    scrollDown() {
        window.scrollTo({
            top:  (this.topMemes.current ? this.topMemes.current.offsetTop - 80 : 0) ,
            behavior: 'smooth'
        });
    }

    render() {
        const memes = this.props.memes.map(meme => 
            <div className="margin-bottom__medium home__meme" key={meme._id}>
                <MemeCard meme={meme}></MemeCard>
            </div>
        );
        return (
            <Fragment>
                <div className="hero row middle-xs center-xs">
                    <img src={efgPic} alt="EFG Fighter" />
                    <div className="text-center">
                        <h1 className="hero__title">Meme Arena</h1>
                        <Link to="/duel"><span className="hero__subtitle clickable">Enter the Battle</span></Link>
                    </div>
                    <div className="hero__scrolldown clickable" onClick={this.scrollDown}>
                        <Icon name='chevron down' size='big' />
                    </div>
                </div>
                <div className="container">
                    <div className="row title center-xs" ref={this.topMemes}>
                        Top Memes
                    </div>
                        
                    <Masonry
                        className={'my-gallery-class'} // default ''
                        elementType={'ul'} // default 'div'
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                        {memes}
                    </Masonry>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state: any): StateProps {
    return { 
        memes: state.memes.home
    };
}

export default connect(mapStateToProps, { getMemes })(Home);