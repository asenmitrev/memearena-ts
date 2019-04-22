import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import { getDuel, vote } from '../actions';
import { connect } from 'react-redux';
import WithLoader from '../HOC/WithLoader';
import { Duel as IDuel, UiState } from '../types';

interface Props {
    duel: IDuel
    ui: UiState
    getDuel(): void
    vote(duelId: string, memeId: string): void 
}

class Duel extends Component<Props> {
    componentWillMount() {
        this.props.getDuel();
    }

    renderDuel() {
        return (
            <div className="container">
                <div className="row title center-xs">
                    Choose the Better Meme
                </div>
                <div className="row row--no-margin center-xs margin-bottom__big">
                    Click on the image to choose the meme that is superior.
                </div>
                <div className="row middle-xs">
                    <div className="col-xs-12 col-md-6 clickable">
                        <Image src={this.props.duel.memeOne.link} alt="Left" fluid bordered rounded onClick={() => this.props.vote(this.props.duel._id, this.props.duel.memeOne._id)}/>
                    </div>
                    <div className="col-xs-12 col-md-6 clickable">
                        <Image src={this.props.duel.memeTwo.link} alt="Right" fluid bordered rounded onClick={() => this.props.vote(this.props.duel._id, this.props.duel.memeTwo._id)}/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return <WithLoader render={this.renderDuel.bind(this)} isLoading={this.props.ui.isLoading || !this.props.duel}/>
    }
}

function mapStateToProps(state: any){
    return { 
        duel: state.duel.duel,
        ui: state.ui
    };
}

export default connect(mapStateToProps, { getDuel, vote })(Duel);
