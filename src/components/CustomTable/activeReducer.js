import { TABLE_SEARCH, TABLE_APLLY } from '../../utils/constans';

const initialTodos = [
  {
    id: 'asdqweqherherher',
    userID: '1',
    userName: 'Bro',
    points: 100,
    type: 'random',
    betValue: '10',
    exitDate: new Date().getTime() + 60000,
    creatingDate: new Date().getTime(),
    isActive: true,
  },
  {
    id: 'askjalsdkjr',
    userID: '1',
    userName: 'Carnage',
    points: 200,
    type: 'random',
    betValue: '1',
    exitDate: new Date().getTime() + 60000,
    creatingDate: new Date().getTime(),
    isActive: false,
  },
  {
    id: 'sgadf',
    userID: '1',
    userName: 'Adolf',
    points: 200,
    type: 'random',
    betValue: '1',
    exitDate: new Date().getTime() + 60000,
    creatingDate: new Date().getTime(),
    isActive: false,
  },
  {
    id: 'asas3dkj',
    userID: '1',
    userName: 'Gregory',
    points: 200,
    type: 'random',
    betValue: '1',
    exitDate: new Date().getTime() + 60000,
    creatingDate: new Date().getTime(),
    isActive: false,
  },
];

const activeReducer = (state = initialTodos, { type, payload }) => {
  switch (type) {
    case TABLE_APLLY:
      return state.map(el => {
        if (el.id === payload) {
          return {
            ...el,
            isActive: !el.isActive,
          };
        }
        return el;
      });
    default:
      return state;
  }
};

export default activeReducer;
