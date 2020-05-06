

export const BookReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_STATE':
        return [...state, ...action.payload]
        case 'ADD_BOOK':
            return [...state, { title: action.book.title, author: action.book.author, id: action.book.id }];
        case 'REMOVE_BOOK':
            return state.filter(book => book.id !== action.id);
        default:
            return state;
    }
}