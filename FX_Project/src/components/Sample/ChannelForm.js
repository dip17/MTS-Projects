// ChannelForm.js
import React, { Component } from "react";
import { Button, Container, Row, Col, Table, Badge } from "react-bootstrap";

export default class ChannelForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          channel: ""
        };
    }

    onChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className="wallet-sec">
                <Container>
                    <Row>
                        <Col sm={12} md={12}>
                        <form>
                            <label>Channel Name</label>
                            <input
                                placeholder="Channel Name"
                                name="channel"
                                value={this.state.channel}
                                onChange={this.onChange}
                            />
                            <input type="submit" value="Join Channel" />
                        </form>
                        </Col>
                    </Row>
                </Container>
                <Call channel={this.state.channel}/>
            </div>
        );
    }
}