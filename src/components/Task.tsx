

import React from 'react'

import styled from 'styled-components'

import { Draggable } from 'react-beautiful-dnd'


const Task = (props) => {
    return <Draggable draggableId={props.task.id} index={props.index}>
        {provided => (
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {props.task.content}
            </Container>
        )}
    </Draggable>
}

export default Task


const Container = styled.div`
    font-family: sans-serif;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid lightsteelblue;
    border-radius: 5px;
    background-color: white
`