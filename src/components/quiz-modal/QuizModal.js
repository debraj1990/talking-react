/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';

class QuizModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      quizQuestionsConsumed: [],
      presentedQuestion: {}
    };

    this.toggle = this.toggle.bind(this);
    this.randomQuestionGenerator = this.randomQuestionGenerator.bind(this);
    this.filterAgainstConsumedList = this.filterAgainstConsumedList.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  filterAgainstConsumedList(randomArrIndex, quizQuestionsConsumed, items) {
    let uniqueFlag = false;
    if(quizQuestionsConsumed.find(quest => quest === randomArrIndex) !== undefined) {
      if((randomArrIndex + 1) < items.length) {
        randomArrIndex += 1;
        this.filterAgainstConsumedList(randomArrIndex, quizQuestionsConsumed, items);
      } else if((randomArrIndex - 1) > 0 || (randomArrIndex - 1) === 0) {
        randomArrIndex -= 1;
        this.filterAgainstConsumedList(randomArrIndex, quizQuestionsConsumed, items);
      }
    } else {
      uniqueFlag = true;
      return randomArrIndex;
    }
  }

  randomQuestionGenerator(items) {
    if(this.state.quizQuestionsConsumed.length === items.length) {
      return {"error": "No More Questions!!"};
    } else {
      let randomArrIndex = Math.floor(Math.random()*items.length);
      randomArrIndex = this.filterAgainstConsumedList(randomArrIndex, this.state.quizQuestionsConsumed, items);
      return items[randomArrIndex];
    }
  }

  render() {
    const quizObj = this.randomQuestionGenerator(this.props.quizQuestions);
    let errorMessage = quizObj.hasOwnProperty("error") ? quizObj.error : 'notAErrorState'; //'The Quiz is functioning unexpectedly. Please try again after some time.'
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Play Quiz with React Master</ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col>
                  <span className={errorMessage === 'notAErrorState' ? 'hidden' : 'bg-red'}>{errorMessage}</span>
                </Col>
              </Row>
              <Row>
                <Col>.col</Col>
                <Col>.col</Col>
                <Col>.col</Col>
                <Col>.col</Col>
              </Row>
              <Row>
                <Col xs="3">.col-3</Col>
                <Col xs="auto">.col-auto - variable width content</Col>
                <Col xs="3">.col-3</Col>
              </Row>
              <Row>
                <Col xs="6">.col-6</Col>
                <Col xs="6">.col-6</Col>
              </Row>
              <Row>
                <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                <Col sm="4">.col-sm-4</Col>
              </Row>
              <Row>
                <Col sm={{ size: 6, order: 2, offset: 1 }}>.col-sm-6 .order-sm-2 .offset-sm-1</Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>.col-sm-12 .col-md-6 .offset-md-3</Col>
              </Row>
              <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
                <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Lock Answer</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default QuizModal;