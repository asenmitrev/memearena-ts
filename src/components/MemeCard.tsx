import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card, Image } from 'semantic-ui-react';
import { Meme } from '../types';

interface Props {
    meme: Meme
}

class MemeCard extends Component<Props> {
    render() {
        const postedOn = moment(this.props.meme.postedDate).format('D MMM YYYY')
        return (
            <Link to={'/memes/' + this.props.meme._id}>
                <Card fluid>
                    <Image src={this.props.meme.link} fluid/>
                    <Card.Content>
                        <Card.Header>Rank {this.props.meme.rank}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Posted on {postedOn}</span>
                        </Card.Meta>
                    </Card.Content>
                </Card>
            </Link>
        );
    }
}

export default MemeCard;