import React, { Fragment, Component } from 'react';

import Modal from '../../components/UI/Modal/Modal'

//No need to import axios, we are getting it from the wrapped component (at the export)

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        //ComponentDidMount does not work because it renders the child elements first!
        componentWillMount() {
            //With interceptors, always need to return the request/response for it to continue
            this.requestInterceptor = axios.interceptors.request.use(null, req => {
                this.setState({ error: null });
                return req
            })

            //res => res simply returns the response
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }

//Explained in video 215 - Removing old interceptors
        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {/* Modal is there, just not visible, even if error is empty (null), it throws an error without the ternary */}
                        {this.state.error ? this.state.error.message : null}

                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
}

export default withErrorHandler;