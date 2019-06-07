import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import NewBet from './NewBet';
import CategorySelector from './CategorySelector';
import styles from './NewBet.module.css';

class NewBetModal extends Component {
  state = {
    isModalOpen: false,
    category: 'random',
    typeBet: ['random', 'cazino', 'football'],
    pointValue: '',
    startBet: new Date().toISOString().substring(0, 16),
    publicationBet: new Date().toISOString().substring(0, 16),
    rate: '',
  };

  idForType = uuidv4();

  idForPoint = uuidv4();

  idForRate = uuidv4();

  idForStartGame = uuidv4();

  idForPublication = uuidv4();

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  handleOnSubmit = e => {
    const { session } = this.props;
    e.preventDefault();

    if (this.state.pointValue > session.user.points)
      return alert('Not enough points');

    if (Number(this.state.rate) > 10 || Number(this.state.rate) < 1)
      return alert('Enter number from 1 to 10');

    if (!Number.isInteger(Number(this.state.rate)))
      return alert('Enter integer');

    if (
      Date.parse(new Date(this.state.publicationBet)) >
        Date.parse(new Date(this.state.startBet)) ||
      Date.parse(new Date(this.state.startBet)) < Date.now() ||
      Date.parse(new Date(this.state.publicationBet)) < Date.now()
    )
      return alert('Enter valid date');

    fetch('http://localhost:8080/api/bets', {
      method: 'POST',
      body: JSON.stringify({
        userID: session.user.id,
        userName: session.user.userName,
        points: Number(this.state.pointValue),
        type: this.state.category || 'random',
        betValue: Number(this.state.rate),
        exitDate: Date.parse(new Date(this.state.publicationBet)),
        creatingDate: Date.parse(new Date(this.state.startBet)),
      }),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
    })
      .then(response => {
        response.json().then(data => {
          console.log(data);
          console.log(session);
        });
      })
      .catch(err => {
        console.log(err);
      });

    this.reset();
  };

  handleNewBetChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  reset() {
    this.setState({
      isModalOpen: false,
      category: 'random',
      pointValue: '',
      startBet: '',
      publicationBet: '',
      rate: '',
    });
  }

  render() {
    console.log(new Date().toISOString().substring(0, 16));
    const {
      isModalOpen,
      category,
      typeBet,
      pointValue,
      startBet,
      publicationBet,
      rate,
    } = this.state;
    const { session } = this.props;
    return (
      <div>
        {session.isAuthenticated && (
          <Button type="button" onClick={this.openModal}>
            New Bet
          </Button>
        )}

        {isModalOpen && (
          <NewBet onClose={this.closeModal}>
            <form onSubmit={this.handleOnSubmit} className={styles.betForm}>
              <p>
                Name <span>{session.user.userName}</span>
              </p>
              <label htmlFor={this.idForType}>
                Type
                <CategorySelector
                  id={this.idForType}
                  name="category"
                  value={category}
                  onChange={this.handleNewBetChange}
                  types={typeBet}
                />
              </label>
              <label htmlFor={this.idForPoint}>
                Point
                <TextField
                  id={this.idForPoint}
                  type="number"
                  value={pointValue}
                  name="pointValue"
                  onChange={this.handleNewBetChange}
                />
              </label>
              <label htmlFor={this.idForRate}>
                Rate
                <TextField
                  id={this.idForRate}
                  type="number"
                  value={rate}
                  name="rate"
                  onChange={this.handleNewBetChange}
                />
              </label>
              <label htmlFor={this.idForStartGame}>
                Start Game
                <TextField
                  id={this.idForStartGame}
                  name="startBet"
                  onChange={this.handleNewBetChange}
                  value={startBet}
                  type="datetime-local"
                />
              </label>
              <label htmlFor={this.idForPublication}>
                Publication
                <TextField
                  id={this.idForPublication}
                  name="publicationBet"
                  onChange={this.handleNewBetChange}
                  value={publicationBet}
                  type="datetime-local"
                />
              </label>

              <Button type="submit" color="primary" className={styles.modalBtn}>
                Создать
              </Button>
            </form>
          </NewBet>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  active: state.active,
  session: state.session,
});

export default connect(mapStateToProps)(NewBetModal);
