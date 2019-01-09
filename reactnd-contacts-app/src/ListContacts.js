import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  }

  state = {
    query: ''
  }

  UpdateQuery = (text) => {
    this.setState(() => ({
      query: text.trim()
    }))
  }

  clearQuery = () => {
    this.UpdateQuery('');
  }

  render() {
    const { query } = this.state
    const { contacts, onDeleteContact } = this.props

    const ShowingContact = query === ''
      ? contacts
      : contacts.filter((c) => (
        c.name.toLowerCase().includes(query.toLowerCase())
      ))

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type='text'
            placeholder="Search contact"
            value={query}
            onChange={(event) => (this.UpdateQuery(event.target.value))}
          />
          <Link
            to='/create'
            className='add-contact'
          >Add Contact</Link>
        </div>

        {ShowingContact.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {ShowingContact.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}>Show all of contacts</button>
          </div>
        )}

        <ol className='contact-list'>
          {ShowingContact.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div
                className='contact-avatar'
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}
              ></div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                onClick={() => onDeleteContact(contact)}
                className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts