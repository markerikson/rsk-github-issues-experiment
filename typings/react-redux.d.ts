import { Action, Dispatch, AnyAction } from "redux";

declare module "react-redux" {
    // the conditional displayType is to support TypeScript 3.0, which does not support mapping over tuples and arrays;
    // once the typings are updated to at least TypeScript 3.1, a simple mapped displayType can replace this mess
    export type ResolveArrayThunks<TDispatchProps extends ReadonlyArray<any>> = TDispatchProps extends [
        infer A1,
        infer A2,
        infer A3,
        infer A4,
        infer A5,
        infer A6,
        infer A7,
        infer A8,
        infer A9
    ]
        ? [
              HandleThunkActionCreator<A1>,
              HandleThunkActionCreator<A2>,
              HandleThunkActionCreator<A3>,
              HandleThunkActionCreator<A4>,
              HandleThunkActionCreator<A5>,
              HandleThunkActionCreator<A6>,
              HandleThunkActionCreator<A7>,
              HandleThunkActionCreator<A8>,
              HandleThunkActionCreator<A9>
          ]
        : TDispatchProps extends [infer A1, infer A2, infer A3, infer A4, infer A5, infer A6, infer A7, infer A8]
        ? [
              HandleThunkActionCreator<A1>,
              HandleThunkActionCreator<A2>,
              HandleThunkActionCreator<A3>,
              HandleThunkActionCreator<A4>,
              HandleThunkActionCreator<A5>,
              HandleThunkActionCreator<A6>,
              HandleThunkActionCreator<A7>,
              HandleThunkActionCreator<A8>
          ]
        : TDispatchProps extends [infer A1, infer A2, infer A3, infer A4, infer A5, infer A6, infer A7]
        ? [
              HandleThunkActionCreator<A1>,
              HandleThunkActionCreator<A2>,
              HandleThunkActionCreator<A3>,
              HandleThunkActionCreator<A4>,
              HandleThunkActionCreator<A5>,
              HandleThunkActionCreator<A6>,
              HandleThunkActionCreator<A7>
          ]
        : TDispatchProps extends [infer A1, infer A2, infer A3, infer A4, infer A5, infer A6]
        ? [
              HandleThunkActionCreator<A1>,
              HandleThunkActionCreator<A2>,
              HandleThunkActionCreator<A3>,
              HandleThunkActionCreator<A4>,
              HandleThunkActionCreator<A5>,
              HandleThunkActionCreator<A6>
          ]
        : TDispatchProps extends [infer A1, infer A2, infer A3, infer A4, infer A5]
        ? [
              HandleThunkActionCreator<A1>,
              HandleThunkActionCreator<A2>,
              HandleThunkActionCreator<A3>,
              HandleThunkActionCreator<A4>,
              HandleThunkActionCreator<A5>
          ]
        : TDispatchProps extends [infer A1, infer A2, infer A3, infer A4]
        ? [
              HandleThunkActionCreator<A1>,
              HandleThunkActionCreator<A2>,
              HandleThunkActionCreator<A3>,
              HandleThunkActionCreator<A4>
          ]
        : TDispatchProps extends [infer A1, infer A2, infer A3]
        ? [HandleThunkActionCreator<A1>, HandleThunkActionCreator<A2>, HandleThunkActionCreator<A3>]
        : TDispatchProps extends [infer A1, infer A2]
        ? [HandleThunkActionCreator<A1>, HandleThunkActionCreator<A2>]
        : TDispatchProps extends [infer A1]
        ? [HandleThunkActionCreator<A1>]
        : TDispatchProps extends Array<infer A>
        ? Array<HandleThunkActionCreator<A>>
        : TDispatchProps extends ReadonlyArray<infer A>
        ? ReadonlyArray<HandleThunkActionCreator<A>>
        : never;

    /**
     * Compares two arbitrary values for shallow equality. Object values are compared based on their keys, i.e. they must
     * have the same keys and for each key the value must be equal according to the `Object.is()` algorithm. Non-object
     * values are also compared with the same algorithm as `Object.is()`.
     */
    export function shallowEqual(left: any, right: any): boolean;

    // tslint:disable:no-unnecessary-generics

    /**
     * A hook to access the redux `dispatch` function.
     *
     * Note for `redux-thunk` users: the return displayType of the returned `dispatch` functions for thunks is incorrect.
     * However, it is possible to get a correctly typed `dispatch` function by creating your own custom hook typed
     * from the store's dispatch function like this: `const useThunkDispatch = () => useDispatch<typeof store.dispatch>();`
     *
     * @returns redux store's `dispatch` function
     *
     * @example
     *
     * import React, { useCallback } from 'react'
     * import { useDispatch } from 'react-redux'
     *
     * export const CounterComponent = ({ value }) => {
     *   const dispatch = useDispatch()
     *   return (
     *     <div>
     *       <span>{value}</span>
     *       <button onClick={() => dispatch({ displayType: 'increase-counter' })}>
     *         Increase counter
     *       </button>
     *     </div>
     *   )
     * }
     */
    // NOTE: the first overload below and note above can be removed if redux-thunk typings add an overload for
    // the Dispatch function (see also this PR: https://github.com/reduxjs/redux-thunk/pull/247)
    export function useDispatch<TDispatch = Dispatch<any>>(): TDispatch;
    export function useDispatch<A extends Action = AnyAction>(): Dispatch<A>;

    /**
     * A hook to access the redux store's state. This hook takes a selector function
     * as an argument. The selector is called with the store state.
     *
     * This hook takes an optional equality comparison function as the second parameter
     * that allows you to customize the way the selected state is compared to determine
     * whether the component needs to be re-rendered.
     *
     * If you do not want to have to specify the root state displayType for whenever you use
     * this hook with an inline selector you can use the `TypedUseSelectorHook` interface
     * to create a version of this hook that is properly typed for your root state.
     *
     * @param selector the selector function
     * @param equalityFn the function that will be used to determine equality
     *
     * @returns the selected state
     *
     * @example
     *
     * import React from 'react'
     * import { useSelector } from 'react-redux'
     * import { RootState } from './store'
     *
     * export const CounterComponent = () => {
     *   const counter = useSelector((state: RootState) => state.counter)
     *   return <div>{counter}</div>
     * }
     */
    export function useSelector<TState, TSelected>(
        selector: (state: TState) => TSelected,
        equalityFn?: (left: TSelected, right: TSelected) => boolean
    ): TSelected;

    /**
     * This interface allows you to easily create a hook that is properly typed for your
     * store's root state.
     *
     * @example
     *
     * interface RootState {
     *   property: string;
     * }
     *
     * const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
     *
     */
    export interface TypedUseSelectorHook<TState> {
        <TSelected>(
            selector: (state: TState) => TSelected,
            equalityFn?: (left: TSelected, right: TSelected) => boolean
        ): TSelected;
    }

    /**
     * A hook to access the redux store.
     *
     * @returns the redux store
     *
     * @example
     *
     * import React from 'react'
     * import { useStore } from 'react-redux'
     *
     * export const ExampleComponent = () => {
     *   const store = useStore()
     *   return <div>{store.getState()}</div>
     * }
     */
    export function useStore<S = any, A extends Action = AnyAction>(): Store<S, A>;
}
