import React from 'react'
import { Message, Image } from 'semantic-ui-react'


const WorldListItem = (props) => (
    <div>
        <Image src={props.imgURL} size='small' />
        <Message>
            <Message.Header>{props.worldName}</Message.Header>
            <p>{props.worldDescription}</p>
        </Message>
    </div>
)

export default WorldListItem