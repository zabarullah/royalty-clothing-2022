import { AnyAction } from "redux";

type Matchable<AC extends () => AnyAction> = AC & {             // AC here being the Action Creator
    type: ReturnType<AC>['type'];                               // ReturnType method used here to get the type from the Action Creator
    match(action: AnyAction):action is ReturnType<AC>;          // match method used to match the action
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends(...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
          return action.type === type;  
        }
    })
}

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
};


export type Action<T> = {
   type: T; 
};


//overload 1
export function createAction<T extends string, P>(
    type: T, 
    payload: P
): ActionWithPayload<T, P>;  // if payload is defined(action type does have a payload) then it will return ActionWithPayload<T, P>

//overload 2
export function createAction<T extends string>(
    type: T, 
    payload: void
): Action<T>;                // if payload is undefined(action type doesnt have any payload) then it will return Action<T>


// This function takes the action and a payload if it is passed and returns back an object(typed) and will be used where we will be dispatching.
export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload };
};


