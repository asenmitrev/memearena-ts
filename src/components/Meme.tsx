import React, { Component, SyntheticEvent } from 'react';
import '../styles/components/Home.scss';
import { connect } from 'react-redux';
import { getMeme, getComments, getMoreComments, comment } from '../actions';
import { Image, Form, Comment, Header, Button } from 'semantic-ui-react';
import WithLoader from '../HOC/WithLoader';
import MemeComment from './MemeComment';
import { Comment as IComment, Meme as IMeme, UiState } from '../types';
import '../styles/components/Meme.scss';
import { RouteComponentProps } from 'react-router-dom';

interface IState {
    comment: string
}

interface StateProps { 
    meme: IMeme,
    comments: IComment[],
    totalComments: number,
    ui: UiState
}

interface DispatchProps {
    comment(comment: string, memeId: string): void,
    getMeme(memeId: string) : void,
    getComments(memeId: string, offset: number) : void,
    getMoreComments(memeId: string, offset: number): void
}

interface Props extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

class Meme extends Component<Props> {
    state: IState = {
        comment: ''
    };

    constructor(props: Props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadMoreComments = this.loadMoreComments.bind(this);
    }

    handleChange(e: SyntheticEvent){
        const target = e.target as HTMLInputElement;
        this.setState({[target.name]: target.value});
    }

    handleSubmit(e: SyntheticEvent){
        e.preventDefault();

        this.props.comment(this.state.comment, this.props.meme._id);
        this.setState({ comment: ''});
    }

    loadMoreComments() {
        this.props.getMoreComments(this.props.match.params.id, this.props.comments.length);
    }

    componentWillMount() {
        this.props.getMeme(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id, 0);
    }

    renderMeme() {
        const comments = this.props.comments.map(comment => 
            <MemeComment comment={comment} key={comment._id}/>
        );

        return (
            <div className="container">
                <div className="row meme middle-xs">
                    <div className="col-xs-12 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                        <Image src={this.props.meme.link} alt="Meme" fluid bordered rounded/>
                    </div>
                </div>
                <Comment.Group>
                    <Header as='h3' dividing>
                        Comments
                    </Header>
                    {comments}
                    {
                        (this.props.totalComments > this.props.comments.length) &&
                        <div className="text-center">
                            <div className="meme__load-more clickable" onClick={this.loadMoreComments}>
                                Load More...
                            </div>
                        </div>
                    }
                    <Form reply onSubmit={this.handleSubmit}>
                        <Form.TextArea name="comment" onChange={this.handleChange}/>
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
            </div>
        );
    }

    render() {
        return <WithLoader render={this.renderMeme.bind(this)} isLoading={this.props.ui.isLoading || !this.props.meme}/>
    }
}

function mapStateToProps(state: any): StateProps{
    return { 
        meme: state.memes.meme,
        comments: state.memes.comments,
        totalComments: state.memes.totalComments,
        ui: state.ui
    };
}

export default connect(mapStateToProps, { getMeme, getComments, getMoreComments, comment })(Meme);