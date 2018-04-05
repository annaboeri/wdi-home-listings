import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import './App.css';

// look at homeData.json to see how the data is structured
import homeData from './homeData.json'
console.log(homeData)

class App extends Component {

  state = {
    headings: homeData.headings,
    listings: homeData.listings,
    sortBy: null,
    sortAscending: true
  }

  handleHeadingClick(evt){
    this.setState({
      sortBy: evt.target.id,
      sortAscending: !this.state.sortAscending,
    })
  }

  sortedListings(){
    const sortBy = this.state.sortBy
    var arr = [ ...this.state.listings ]
      return arr.sort(function(a, b){
      if(a[sortBy] < b[sortBy]) return -1
      if(a[sortBy] > b[sortBy]) return 1
      return 0
    })
  }

// "&darr"
  render() {
    return (
      <div className="App">
        <Container>
          <h1>Home Listings</h1>
          <Table striped bordered>
            {/* table headers */}
            <thead>
              <tr>
               { this.state.headings.map((h, index) => {
                  return <th onClick={this.handleHeadingClick.bind(this)} key={index} id={h.field}>{h.label}<span></span></th>
               })}
              </tr>
            </thead>
            {/* table rows */}
            <tbody>

            { this.sortedListings().map((l) => {
                  return (
                    <tr key={l._id}>
                      {Object.keys(l).map((field, index) => {
                        return (
                        <td key={index}>{l[field]}</td>
                        )
                      })}
                      {/* Same as:
                      <td>{l._id}</td>
                      <td>{l.address}</td>
                      <td>{l.city}</td>
                      <td>{l.homeType}</td>
                      <td>{l.bedrooms}</td>
                      <td>{l.bathrooms}</td>
                      <td>{l.floorType}</td>
                      <td>{l.rent}</td> */}
                    </tr>
                  )  
                
               })}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default App;
