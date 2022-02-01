import moment from "moment";
import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
    
} from "reactstrap";


export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    }

    render() {
        const { toggle, onSave } = this.props;

        return(
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Todo Item
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="todo-description"><strong>Description</strong></Label>
                            <Input
                                type="text"
                                id="todo-description"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter Todo Description"
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-target-date"><strong>Target Date</strong></Label>
                            <Input
                                type="date"
                                id="todo-target-date"
                                name="target_date"
                                value={this.state.activeItem.target_date}
                                onChange={this.handleChange}
                            ></Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.activeItem)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}