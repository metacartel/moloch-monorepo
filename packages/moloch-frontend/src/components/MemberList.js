// import React from 'react';
// import { Grid, Image, Divider } from 'semantic-ui-react';
// import { Switch, Route, Link } from 'react-router-dom';

// import MemberDetail from './MemberDetail';
// import bull from 'assets/bull.png';
// import hood from 'assets/hood.png';

// import { connect } from 'react-redux';
// import { fetchMembers, fetchConfigFounders, fetchMemberDetail } from '../action/actions';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';

// const MemberAvatar = ({ address, shares }) => (
//   <Grid.Column mobile={5} tablet={3} computer={3} textAlign="center" className="member_avatar" title={address}  >
//     <Link to={`/members/${address}`} className="uncolored">
//       <Image src={hood} centered size='tiny' />
//       <p className="name">{!address ? '' : (address.length > 10 ? address.substring(0, 10) + '...' : address)}</p>
//       <p className="subtext">{shares} shares</p>
//     </Link>
//   </Grid.Column>
// );

// const GET_LOGGED_IN_USER = gql`
//   query User($address: String!) {
//     member(id: $address) {
//       id,
//       shares,
//       isActive
//     }
//   }
// `
// class LoggedInUser extends React.Component {
//   render() {
//     let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
//     return (
//       <Query query={GET_LOGGED_IN_USER} variables={{ address: loggedUser.address }}>
//         {({ loading, error, data }) => {
//           if (loading) return "...";
//           if (error) throw new Error(`Error!: ${error}`);
//           return data.member && data.member.isActive
//           ? <Link to={`/members/${data.member.id}`} className="uncolored">
//               <Image centered src={bull} size='tiny' />
//               <p className="name">{!data.member.id ? '' : (data.member.id.length > 10 ? data.member.id.substring(0, 10) + '...' : data.member.id)}</p>
//               <p className="subtext">{data.member.shares ? data.member.shares : 0} shares</p>
//             </Link>
//           : <div />
//         }}
//       </Query>
//     )
//   }
// }

// const GET_ELDERS = gql`
//   {
//     members(where: { shares_gte: 100, isActive: true }) {
//       id
//       shares
//     }
//   }
// `
// const Elders = () => (
//   <Query query={GET_ELDERS}>
//     {({ loading, error, data }) => {
//       if (loading) return "...";
//       if (error) throw new Error(`Error!: ${error}`);
//       return (
//         data.members.length > 0 ?
//         data.members.map((elder, idx) => <MemberAvatar address={elder.id} shares={elder.shares} key={idx} />) : 
//         <>No elders to show.</>
//       )
//     }}
//   </Query>
// )

// const GET_NON_ELDERS = gql`
//   {
//     members(where: { shares_lt: 100, isActive: true }) {
//       id
//       shares
//     }
//   }
// `
// const Contributors = () => (
//   <Query query={GET_NON_ELDERS}>
//     {({ loading, error, data }) => {
//       if (loading) return "...";
//       if (error) throw new Error(`Error!: ${error}`);
//       return (
//         data.members.length > 0 ?
//         data.members.map((contributor, idx) => <MemberAvatar address={contributor.id} shares={contributor.shares} key={idx} />) : 
//         <>No contributors to show.</>
//       )
//     }}
//   </Query>
// )

// const GET_MEMBERS = gql`
//   {
//     members(where: { shares_gt: 0, isActive: true }) {
//       id
//     }
//   }
// `
// const MemberList = () => (
//   <Query query={GET_MEMBERS}>
//     {({ loading, error, data }) => {
//       let members
//       if (error) {
//         members = 'NA'
//         console.error(`Could not load members: ${error}`)
//       } else if (loading) {
//         members = '-'
//       } else {
//         members = data.members.length
//       }
//       return (
//         <div id="member_list">
//           <Grid columns={16} verticalAlign="middle">
//             <Grid.Column mobile={16} tablet={6} computer={6} textAlign="left" className="member_list_header">
//               <p className="subtext">{members} Members</p>
//               <p className="title">Ranking</p>
//             </Grid.Column>

//             {/* <Grid.Column mobile={16} tablet={10} computer={10} textAlign="right" className="submit_button">
//               <Link to='/membershipproposalsubmission' className="link">
//                 <Button size='large' color='red' disabled={(props.user.status === 'founder') ? true : false}>Membership Proposal</Button>
//               </Link>
//             </Grid.Column> */}
//           </Grid>

//           <Grid>
//             <Grid.Column textAlign="center">
//               <LoggedInUser />
//             </Grid.Column>
//           </Grid>
//           <Grid className="member_item">
//             <Grid.Row>
//               <p style={{ paddingLeft: '1rem' }}>Elders (100+ shares)</p>
//             </Grid.Row>
//             <Divider />
//             <Grid.Row className="members_row" centered>
//               <Elders />
//             </Grid.Row>
//           </Grid>
//           <Grid className="member_item">
//             <Grid.Row>
//               <p style={{ paddingLeft: '1rem' }}>Contributors</p>
//             </Grid.Row>
//             <Divider />
//             <Grid.Row className="members_row" centered>
//               <Contributors />
//             </Grid.Row>
//           </Grid>
//         </div>
//       );
//     }}
//   </Query>
// );

// const MemberListView = () => (
//   <Switch>
//     <Route 
//       exact 
//       path="/members" 
//       render={() => <MemberList />} 
//     />
//     <Route path="/members/:name" component={MemberDetail} />
//   </Switch>
// )

// // This function is used to convert redux global state to desired props.
// function mapStateToProps(state) {
//   return {
//     members: state.members.items,
//     elders: state.founders.items
//   };
// }

// // This function is used to provide callbacks to container component.
// function mapDispatchToProps(dispatch) {
//   return {
//     fetchMembers: function () {
//       return dispatch(fetchMembers());
//     },
//     fetchConfigFounders: function () {
//       return dispatch(fetchConfigFounders());
//     },
//     fetchMemberDetail: function (id) {
//       return dispatch(fetchMemberDetail(id))
//     }
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MemberListView);

import React from 'react';
import { Grid, Image, Divider } from 'semantic-ui-react';
import { Switch, Route, Link } from 'react-router-dom';

import MemberDetail from './MemberDetail';
import bull from 'assets/bull.png';
import hood from 'assets/hood.png';

import { connect } from 'react-redux';
import { fetchActiveMembers, fetchConfigFounders, fetchMemberDetail, fetchMembersWithShares } from '../action/actions';

const MemberAvatar = ({ address, shares, name }) => {
  let displayedName = name ? name : address;
  return (
    <Grid.Column mobile={5} tablet={3} computer={3} textAlign="center" className="member_avatar" title={displayedName}  >
      <Link to={`/members/${address}`} className="uncolored">
        <Image src={hood} centered size='tiny' />
        <p className="name">{!displayedName ? '' : (displayedName.length > 10 ? displayedName.substring(0, 10) + '...' : displayedName)}</p>
        <p className="subtext">{shares} shares</p>
      </Link>
    </Grid.Column>
  )
};

const MemberList = (props) => {
  console.log(props)
  return (
    <div id="member_list">
      <Grid columns={16} verticalAlign="middle">
        <Grid.Column mobile={16} tablet={6} computer={6} textAlign="left" className="member_list_header">
          <p className="subtext">{props.totalMembers} Members</p>
          <p className="title">Ranking</p>
        </Grid.Column>

        {/* <Grid.Column mobile={16} tablet={10} computer={10} textAlign="right" className="submit_button">
          <Link to='/membershipproposalsubmission' className="link">
            <Button size='large' color='red' disabled={(props.user.status === 'founder') ? true : false}>Membership Proposal</Button>
          </Link>
        </Grid.Column> */}
      </Grid>

      {props.user.status === 'founder' || props.user.status === 'passed' ?
        <Grid>
          <Grid.Column textAlign="center" title={props.user.name}>
            <Link to={`/members/${props.user.address}`} className="uncolored">
              <Image centered src={bull} size='tiny' />
              <p className="name">{(props.user.name.length > 10 ? props.user.name.substring(0, 10) + '...' : props.user.name)}</p>
              <p className="subtext">{props.user.shares ? props.user.shares : 0} shares</p>
            </Link>
          </Grid.Column>
        </Grid>
        : null
      }
      <Grid className="member_item">
        <Grid.Row>
          <p style={{ paddingLeft: '1rem' }}>Elders (100+ shares)</p>
        </Grid.Row>
        <Divider />
        <Grid.Row className="members_row" centered>
          {props.elders.length > 0 ?
            props.elders.map((elder, idx) => <MemberAvatar {...elder} key={idx} />) : <>No elders to show.</>}
        </Grid.Row>
      </Grid>
      <Grid className="member_item">
        <Grid.Row>
          <p style={{ paddingLeft: '1rem' }}>Contributors</p>
        </Grid.Row>
        <Divider />
        <Grid.Row className="members_row" centered>
          {props.members.length > 0 ?
            props.members.map((contributor, idx) => <MemberAvatar {...contributor} key={idx} />) : <>No contributors to show.</>}
        </Grid.Row>
      </Grid>
    </div>
  )
};

class MemberListView extends React.Component {
  constructor(props) {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    super(props);
    this.state = {
      totalMembers: 0,
      user: {
        address: loggedUser.address,
        shares: 0,
        status: ''
      }
    }
  }
  componentDidMount() {
    this.props.fetchActiveMembers();
    this.props.fetchConfigFounders();
    this.props.fetchMembersWithShares()
      .then((responseJson) => {
        this.setState({ totalMembers: parseInt(responseJson.items) })
      });

    this.props.fetchMemberDetail(this.state.user.address)
      .then((responseJson) => {
        if (responseJson.type === 'FETCH_MEMBER_DETAIL_SUCCESS') {
          let user = this.state.user;
          user.shares = responseJson.items.member.shares;
          user.status = responseJson.items.member.status;
          user.name = responseJson.items.member.name ? responseJson.items.member.name : responseJson.items.member.address;
          console.log('res', responseJson)
          this.setState({ user: user });
        }
      })
  }
  render() {
    return (
      <Switch>

        <Route exact path="/members" render={(props) => <MemberList members={this.props.members} elders={this.props.elders} totalMembers={this.state.totalMembers} user={this.state.user} />} />
        <Route path="/members/:name" component={MemberDetail} />
      </Switch>
    )
  }
}

// This function is used to convert redux global state to desired props.
function mapStateToProps(state) {
  return {
    members: state.activeMembers.items,
    elders: state.founders.items
  };
}

// This function is used to provide callbacks to container component.
function mapDispatchToProps(dispatch) {
  return {
    fetchActiveMembers: function () {
      return dispatch(fetchActiveMembers());
    },
    fetchConfigFounders: function () {
      return dispatch(fetchConfigFounders());
    },
    fetchMemberDetail: function (id) {
      return dispatch(fetchMemberDetail(id))
    },
    fetchMembersWithShares: function () {
      return dispatch(fetchMembersWithShares());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberListView);