import React, { Component } from 'react';
import './initial.css';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import {fetchProperties} from './actions/index';

class PropertyDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      property: {
        taxes:'',
        mortgage:'',
        state: '',
        city: '',
        street_address: '',
        zip: '',
        name: '',
        id: null
      },
      apartments: [{
        number: null,
        property_id: null,
        id: null
      }],
      tenants: [{
        name: "",
        age: null,
        phone: "",
        email: "",
        id: null,
        apartment_id: null,
        apartment_number: null,
        property_id: null
      }]
    }
  }


  componentDidMount(props){
  fetch(`https://property-assistant-backend.herokuapp.com/properties/${this.props.match.params.id}`)
  .then(data => data.json())
  .then(data=> {
    this.setState({
    property: data.Property,
    apartments:data.Apartment,
    tenants:data.Tenant
              })
            })
  }

render() {
  console.log(this.state)

  const apartments = this.state.apartments.map( (ap, index) => {


      const tenants = this.state.tenants.map( (t, index)=> {
        let newTenants = this.state.tenants.slice()
        let tenantToUpdate = newTenants[index]

        if (t.apartment_id === ap.id) {
          return (
            <div>
              Name: {t.name}
              <br/>
              Phone Number: {t.phone}
              <br/>
              Email: {t.email}
              <br/>
              Age: {t.age}
              <br/>
              <br/>
            </div>
            )
          }
        })
        return (
  <div class="card">

    <div class="content">
      <a class="header">
        Apartment: {ap.number}
        </a>
        <br/>
        </div>
      <div class="description" textAlign='center'>
        <h2>Tenants:</h2>
          {tenants}
      </div>
  </div>
)
})

    return (
      <div className="Detail">
        <br/>
        <br/>
        <div class="ui tertiary inverted light blue segment">
          <h1 class="ui center aligned icon header">
            <i class="circular building icon"></i>
            {this.state.property.name}
          </h1>
        </div>
        <br/>
        <div class="ui icon buttons">
          <button blue class="ui button">
            <Link to={`/edit_property/${this.state.property.id}`}>
            Edit Property: <i class="edit icon"></i>
              </Link>
            </button>
          </div>
          <br/>
          <div class="ui tertiary inverted light blue segment">
          <h2>{this.state.property.street_address}</h2>
          <h2>{this.state.property.city}</h2>
          <h2>{this.state.property.state}</h2>
          <h2>Taxes: {this.state.property.taxes}</h2>
          <h2>Mortgage: {this.state.property.mortgage}</h2>
          </div>
          <br/>
        <div class="ui centered three stackable link cards">
          {apartments}
        </div>
      </div>
    );
  }
}


// const mapDispatchToProps=(dispatch)=>{
//   return { loginUser: bindActionCreators(this.props.loginUser, dispatch)  }
// };
//
// export default withRouter(connect(null, mapDispatchToProps)(Login));

const mapStateToProps=(state)=>{
  console.log(state.auth.currentUser.properties)
  return {properties:state.auth.currentUser.properties}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) =>dispatch(fetchProperties(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetail)
