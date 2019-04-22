import React, { Component, ReactElement } from 'react';

interface Props {
    isLoading: boolean;
    render(): ReactElement
}

class WithLoader extends Component<Props> {
    render() {
        return <div>
            {this.props.isLoading ? '' : this.props.render()}
            {this.props.isLoading ? <div className="loader"></div> : '' }
        </div>;
    }
}

export default WithLoader;