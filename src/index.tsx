


import React, { Fragment, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { initialData } from './data/initial_data'
import Column from './components/Column'
import EditInput from './components/EditInput'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import styled from 'styled-components'
import './index.css'
import { setTextRange } from 'typescript'

const Container = styled.div`
  font-family: sans-serif;
  display: flex;
  margin: 8px;
  border: 1px solid lightsteelblue;
  border-radius: 5px;
`

// eslint-disable-next-line @typescript-eslint/no-redeclare
type initialData = {
  tasks: Object,
  columns: {
    id: string,
    title: string,
    taskIds: [],
  },
  columnOrder: [],
  numBucket: number,
  numCard: number,
}

const App: React.FC = () => {

  const [state, setState] = React.useState(initialData)
  const [text, setText] = React.useState()
  const [textCard, setTextCard] = React.useState()
  const [bucketId, setBucketId] = React.useState()
  const [bucketCard, setBucketCard] = React.useState()

  useEffect(() => {
    setState((prevState) => {
      return { ...prevState, numBucket: state.columnOrder.length }
    })
    setState((prevState) => {
      return { ...prevState, numCard: Object.keys(state.tasks).length }
    })
    console.log('TaskIds: ', text)
    if (bucketCard === 'bucket') {
      handleBuckets(text)
    }
    if (bucketCard === 'card') {
      if (state.columns) {
        handleCards(text, textCard, bucketId)
      }
    }
    console.log('All Data: ', text, textCard, bucketId)
  }, [text, textCard])

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result

    if (!destination) { return }
    if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder)
      newColumnOrder.splice(source.index, 1)
      console.log('draggableId: ', draggableId)
      console.log('Destination Index: ', destination.index)
      const newOrder = [...newColumnOrder.slice(0, destination.index), draggableId, ...newColumnOrder.slice(destination.index)]
      // newColumnOrder.splice(destination.index, 0, draggableId) // Old array manipulati 
      console.log(newOrder)

      const newState = {
        ...state,
        columnOrder: newOrder,
      }
      // @ts-ignore
      setState(newState)
      return
    }

    const start = state.columns[source.droppableId]
    const finish = state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      }
      setState(newState)
      return
    }

    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }
    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    setState(newState)
  }

  const handleBuckets = (text) => {
    setState((prevState) => {
      return { ...prevState, numBucket: state.numBucket++ }
    })
    // @ts-ignore
    setState((prevState) => {
      return {
        ...prevState,
        columns: {
          ...state.columns,
          ['column-' + state.numBucket]: {
            id: 'column-' + state.numBucket,
            title: text,// Title Bucket
            taskIds: [],

          },
        },
        columnOrder: [...state.columnOrder, 'column-' + state.numBucket],
        numBucket: state.numBucket
      }
    })
  }
  const handleCards = (text, textCard, bucketId) => {
    console.log('Card Data: ', text, textCard, bucketId)

    setState((prevState) => {
      return { ...prevState, numCard: state.numCard++ }
    })
    setState((prevState) => {
      return {
        ...prevState,
        tasks: {
          ...state.tasks,
          ['task-' + state.numCard]: {
            id: 'task-' + state.numCard,
            content: textCard,
          },
        },
        columns: {
          ...state.columns,
          [bucketId]: {
            id: bucketId,
            title: state.columns[bucketId].title,// Title Bucket
            taskIds: [...state.columns[bucketId].taskIds, 'task-' + state.numCard],
          }
        },
        numCard: state.numCard,
      }
    })
  }

  console.log(state)

  const handleEdit = (textFromInput, bucketcard) => {
    console.log('Text From Bucket Function:', textFromInput)
    setBucketCard(bucketcard)
    setText(textFromInput)
    console.log('Text Bucket: ', text)
  }
  const handleEditCard = (textFromInputCard, bucketId, bucketcard) => {
    console.log('Text From Card Function:', textFromInputCard)
    setBucketCard(bucketcard)
    setBucketId(bucketId)
    setTextCard(textFromInputCard)
    console.log('Text Card: ', textCard)
  }
  return <Fragment>
    {/* <div onFocus={handleBuckets} >
      <EditInput handleBuckets={handleBuckets}/>
    </div>
    <button onClick={handleBuckets} > Add Bucket </button> */}

    <EditInput handleEdit={handleEdit} bucketCard={'bucket'} />

    <DragDropContext onDragEnd={onDragEnd} >
      <Droppable
        droppableId='all-columns'
        direction='horizontal'
        type='column'
      >
        {provided => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {
              state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId]
                // @ts-ignore
                const tasks = column.taskIds && column.taskIds.map(taskId => state.tasks[taskId])
                // @ts-ignore
                return <Column key={column.id} column={column} tasks={tasks} index={index} handleEditCard={handleEditCard} />
                // handleEditCard={handleEditCard}
              })
            }
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  </Fragment>
}

ReactDOM.render(<App />, document.getElementById('root'))
