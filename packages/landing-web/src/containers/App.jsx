import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { user } = this.props;
    return (
      <div className="demo-app">
        {user}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.demo.user,
});
export default withRouter(connect(mapStateToProps, null)(App));
