import React, { Component } from 'react';
import '../styles/components/Home.scss';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';
import avatar from '../img/avatar.png';
import { Comment as IComment } from '../types';

interface Props {
    comment: IComment
}

class MemeComment extends Component<Props> {
    render() {
        const postedOn = moment(this.props.comment.postedOn).format('D MMM YYYY')

        return <Comment>
            <Comment.Avatar src={avatar} />
            <Comment.Content>
                <Comment.Author>Anonymous</Comment.Author>
                <Comment.Metadata>
                    <div>{postedOn}</div>
                </Comment.Metadata>
                <Comment.Text>{this.props.comment.content}</Comment.Text>
            </Comment.Content>
        </Comment>
    }
}

export default MemeComment;