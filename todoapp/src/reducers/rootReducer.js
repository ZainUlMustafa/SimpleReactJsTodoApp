const initState = {
    allNews: [

    ],

    updateFlag: false,

    
}

const rootReducer = (state = initState, action) => {
    console.log(action)
    if (action.type === 'UPDATE_ALL_NEWS') {
        return {
            ...state,
            allNews: action.allNewsData,
            updateFlag: action.updateFlag,
        }
    }
    else if (action.type === 'FORCE_UPDATE') {
        console.log(action.updateFlag)
        return {
            ...state,
            updateFlag: action.updateFlag,
        }
    }
    else if (action.type === 'DELETE_NEWS') {
        let filteredNews = state.allNews.filter(news => {
            return action.id !== news.id;
        });

        return {
            ...state,
            allNews: filteredNews,
        }
    }
    return state;
}

export default rootReducer;