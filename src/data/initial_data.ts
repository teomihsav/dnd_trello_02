// export const initialData = {
//   tasks: {},
//   columns: {
//     id: "",
//     title: "",
//     taskIds: [],
//   },
//   columnOrder: [],
//   numBucket: 0,
//   numCard: 0,
// };

export const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Test One' },
    'task-2': { id: 'task-2', content: 'Test Two' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Second',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Third',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
  numBucket: 0,
  numCard: 0,
}
