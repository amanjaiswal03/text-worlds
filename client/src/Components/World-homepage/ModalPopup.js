import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import { addCharacterMutation, getWorldQuery } from '../../queries/queries';
import jwt_decode from 'jwt-decode'


const ModalPopup = (props) => {
    const [name, setName] = useState('');
    const [story, setStory] = useState('');
    const [gateway, setGateway] = useState(false);
    let alreadyJoined = false;
    const [addCharacter] = useMutation(addCharacterMutation);

    let link = '/world/' + props.world._id + '/graph';
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addCharacter({variables: {
            name: name,
            story: story,
            worldId: props.world._id,
            userId: (jwt_decode(localStorage.usertoken))._id,
        }, refetchQueries: [{ query: getWorldQuery , variables: {id: props.world._id}}]}).then(()=>{
          setName('');
          setStory('');
          setGateway(true);
        })
        return null
    }
    //checking if authenticated
    if (!localStorage.usertoken){
      return (
        <Modal size = "mini" trigger = {<Button neutral = 'true' className = "join-world">Join the world</Button>}>
          <Modal.Header>Login or Sign up first to join the world</Modal.Header>
        <Modal.Content>
          <div className = "redirect-auth">
          <Link to = '/login'><Button primary size = "large"> Login </Button></Link> <br />
          <Link to = '/signup'><Button secondary size = "large"> Sign up </Button></Link>
          </div>
        </Modal.Content>
      </Modal>
      )
    }
    // checking if already joined
    props.world.characters.map((character) => {
      if(character.userId === jwt_decode(localStorage.usertoken)._id){
        alreadyJoined = true;
      }
      return null;
    })

    if(alreadyJoined){
      return <div> <Link to = {link}><Button positive className = "join-world">Enter the world</Button></Link></div>
    }

    // redirecting to the graph after creating the character
    if (gateway){
      return <Redirect to = {link} />
    }
    
    // modal popup to create a character
    return(
  <Modal trigger={<Button positive className = "join-world">Join the world</Button>}>
    <Modal.Header className = "add-character-form">Define your character</Modal.Header>
    <Modal.Content image className = "add-character">
      <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Fill out the form</Header>
        <Form onSubmit = {handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field label='Name of the character' control='input' value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Field label='Your Background Story' control='textarea' rows='3' value={story} onChange = {(e) => setStory(e.target.value)} />
            {/* <div onChange={event => setGender(event)}>
                <input type="radio" value="Male" name="gender"/> Male
                <input type="radio" value="Female" name="gender"/> Female
            </div> */}
            <Form.Field control='button'>
                CREATE CHARACTER
            </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)}

export default ModalPopup