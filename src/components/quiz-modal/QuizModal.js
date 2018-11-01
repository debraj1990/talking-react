/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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