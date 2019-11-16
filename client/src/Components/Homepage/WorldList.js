import React from 'react'
import { List, Image, Message, Button } from 'semantic-ui-react'
import Header from '../Header/Header'
import WorldDescription from './WorldDescription';
import WorldListItem from './WorldListItem';
import { Link } from 'react-router-dom';
import p1 from '../../assets/Worlds/p1.png'
import p2 from '../../assets/Worlds/p2.png'
import pf3 from '../../assets/Worlds/pf3.png'
import pf4 from '../../assets/Worlds/pf4.png'
import pp1 from '../../assets/Worlds/pp1.png'
import { getAllWorlds } from '../../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import styled from "styled-components";

// const Button = styled.Message`
//   /* This renders the buttons above... Edit me! */
//   display: inline-block;
//   border-radius: 3px;
//   padding: 0.5rem 0;
//   margin: 0.5rem 1rem;
//   width: 11rem;
//   background: transparent;
//   color: white;
//   border: 2px solid white;
  // `

const Hello = styled(Button)({
    width: '10rem!important',
    color: 'red!important'
});

const Img = styled(Image)({
    color: 'red!important',
    display: 'inline-block!important'
});

const Msg = styled(Message)({
    display: 'inline-block!important'
});

function WorldList() {
const { loading, error, data } = useQuery(getAllWorlds);
const picNames = [p1, p2, pf3, pf4, pp1];

if (loading) {
    return <div className="ui active centered loader loading-screen"></div>
};
if (error) return <p>Error :(</p>;
    return (
      <div>
        <Header />
        <div className = "world-list">
          {data.worlds.map(( world ) => (
            <div>
              <Link to = {'/world/' + world._id} >
                <Img src={picNames[Math.floor(Math.random() * Math.floor(4))]} size='small' wrapped />
                <Msg>
                    <Msg.Header>{world.name}</Msg.Header>
                    <p>{world.description}</p>
                </Msg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}

export default WorldList;