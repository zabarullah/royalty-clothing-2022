import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';

export function* rootSaga(){                    // Generator function
    yield all([call(categoriesSaga), call(userSagas)]);
}