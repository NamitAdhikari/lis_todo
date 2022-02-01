// import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import moment from "moment";
import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

const todoitems = [
  {
      "id": 1,
      "description": "First Todo",
      "target_date": "2022-02-11"
  },
  {
      "id": 2,
      "description": "Second Todo",
      "target_date": "2022-02-12"
  },
];

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          todoList: [],
          modal: false,
          activeItem: {
            description: "",
            target_date: ""
          },
      };
    };

    componentDidMount() {
      this.refreshList();
    }

    refreshList = () => {
      axios
        .get("/api/todos/")
        .then((res) => this.setState({todoList: res.data}))
        .catch((err) => console.log(err));
    }

    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };

    handleSubmit = (item) => {
      this.toggle();

      if (item.id) {
        axios
          .put(`/api/todos/${item.id}/`, item)
          .then((res) => this.refreshList())
          .catch((err) => console.log(err));
      } else {
        axios
          .post(`/api/todos/`, item)
          .then((res) => this.refreshList())
          .catch((err) => console.log(err));
      }

    };

    deleteItem = (item) => {
      axios
        .delete(`/api/todos/${item.id}`)
        .then((res) => this.refreshList())
        .catch((err) => console.log(err)); 
    };

    createItem = () => {
      const item = {
        description: "",
        target_date: ""
      }

      this.setState({activeItem: item, modal: !this.state.modal});
    };

    updateItem = (item) => {
      this.setState({activeItem:item, modal: !this.state.modal});
    };

    renderItems = () => {
      const items = this.state.todoList.filter(
          (item) => item.target_date >= moment().format('YYYY-MM-DD')
      );

      return items.map((item) => (
        <li
          key={item.id}
          className="list-group-item custom-grid justify-content-between align-items-center"
        >
          <span
            className="todo-description"
          >
            {item.description}
          </span>
          <span
            className="todo-target-date"
          >
            {item.target_date}
          </span>
          <span>
            <button
              className="btn btn-success mx-1"
              onClick={() => this.updateItem(item)}
            >
              Update
            </button>
            <button
              className="btn btn-warning"
              onClick={() => this.deleteItem(item)}
            >
              Delete
            </button>
          </span>
        </li>
      ));
    }

    render() {
      return (
        <main className="container">
          <h1 className="text-black text-uppercase text-center my-4">Todo App</h1>
          <div className='row'>
            <div className='col-md-6 mx-auto p-0'>
            <div className="mb-4">
                  <button
                    className="btn btn-primary custom-btn"
                    onClick={this.createItem}
                  >
                    Add Task
                  </button>
                </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="custom-card p-3">
                <h3 className='mb-4'>List of TODO's</h3>
                <ul className="list-group list-group-flush border-top-0">
                <li
                  className="custom-grid justify-content-between align-items-center"
                >
                  <span><strong>Description</strong></span>
                  <span><strong>Target Date</strong></span>
                  <span></span>
                </li>
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
          {this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
        </main>
      );
    }
};

export default App;