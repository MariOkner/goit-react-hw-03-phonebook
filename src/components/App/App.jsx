import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';

import { Container, TitlePhonebook, TitleContacts } from './App.styled';

export class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string,
  };

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleContactFormSubmit = ({ name, number }) => {
    if (
      this.state.contacts.some(contact => {
        return contact.name.toLowerCase() === name.toLowerCase();
      })
    ) {
      toast.warn(`${name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, { id: nanoid(), name: name, number: number }],
    }));
  };

  handleFilterChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleContactDelete = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => {
        return contact.id !== id;
      }),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <Container>
        <TitlePhonebook title="Phonebook">Phonebook</TitlePhonebook>
        <ContactForm handleSubmit={this.handleContactFormSubmit} />

        <TitleContacts title="Contacts">Contacts</TitleContacts>

        {contacts.length === 0 ? null : (
          <Filter value={filter} onChange={this.handleFilterChange} />
        )}
        {contacts.length === 0 ? null : (
          <ContactList
            contacts={contacts}
            filter={filter}
            onDelete={this.handleContactDelete}
          />
        )}
        <ToastContainer />
      </Container>
    );
  }
}
