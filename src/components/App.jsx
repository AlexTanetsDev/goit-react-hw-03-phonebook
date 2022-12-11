import { Component } from "react";
import { nanoid } from 'nanoid'
import { GlobalStyles } from "./GlobalStyles";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Wrapper } from "./wrapper.styled";



export class App extends Component {
state = {
  contacts: [],
  filter: ''
}
  
  componentDidMount() {
 try {
      const savedContacts = JSON.parse(localStorage.getItem('contacts'));
      this.setState({contacts: savedContacts})
    } catch (error) {
      console.log(error.message);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  addContact = (contact) => {
    const isAlredyContact = this.state.contacts.some(item => {
      return item.name.toLowerCase() === contact.name.toLowerCase()
    })
    if (isAlredyContact) {
      alert(`${contact.name} is alrady in contacts`)
      return;
    }
    contact.id = nanoid(5);
    this.setState(prevState => {
      return {contacts: [...prevState.contacts, contact]}
})
}


  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  }
  

  hendleFilterChange = (e) => {
    this.setState({filter: e.currentTarget.value})

  }

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
}

  
  render() {
    const visibleContacts = this.getFilteredContacts();
    return (
         <>
           <GlobalStyles />
           <Wrapper>
             <h1>Phonebook</h1>
             <ContactForm onFormSubmit={this.addContact} />

             <h2>Contacts</h2>
          <Filter value={this.state.filter} onInputChange={this.hendleFilterChange } />
          <ContactList contacts={ visibleContacts } deleteContact={this.deleteContact} />
           </Wrapper>
         </>
    )
 
};
};
