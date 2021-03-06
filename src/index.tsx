





import React, { Fragment, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { initialData } from './data/initial_data'
import Column from './components/Column'
import EditInput from './components/EditInput'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import styled from 'styled-components'
import './index.css'

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
  const [bucketId, setBucketId] = React.useState()

  useEffect(() => {
    console.log('Rendering...')
    setState((prevState) => {
      return { ...prevState, numBucket: state.columnOrder.length }
    })
    setState((prevState) => {
      return { ...prevState, numCard: Object.keys(state.tasks).length }
    })
  }, [])

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
      console.log(newState)
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

  const handleBuckets = (textBucket) => {
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
            title: <EditInput handleEdit={handleEdit} text={textBucket} />,// Title Bucket
            taskIds: [],

          },
        },
        columnOrder: [...state.columnOrder, 'column-' + state.numBucket],
        numBucket: state.numBucket
      }
    })
  }

  const handleCards = (textCard, bucketId) => {
    console.log('Card Data: ', textCard, bucketId)

    setState((prevState) => {
      return { ...prevState, numCard: state.numCard++ }
    })
    setState((prevState) => {
      return {
        ...prevState,
        columns: {
          ...state.columns,
          [bucketId]: {
            id: bucketId,
            title: state.columns[bucketId].title,// Title Bucket
            taskIds: [...state.columns[bucketId].taskIds, 'task-' + state.numCard],
          }
        },
        tasks: {
          ...state.tasks,
          ['task-' + state.numCard]: {
            id: 'task-' + state.numCard,
            content: <EditInput text={textCard} handleEditCard={handleEditCard} bucketCard={'card'} bucketId={bucketId} />,
          },
        },
        numCard: state.numCard,
      }
    })
  }

  console.log('State: ', state)

  const handleEdit = (textFromInput, bucketcard) => {
    console.log('Text From Bucket Function:', textFromInput)
    console.log('Text Bucket: ', textFromInput)
    handleBuckets(textFromInput)
  }

  const handleEditCard = (textFromInputCard, bucketId) => {
    console.log('Text From Card Function:', textFromInputCard)
    setBucketId(bucketId)

    handleCards(textFromInputCard, bucketId)
  }

  return <Fragment>

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
