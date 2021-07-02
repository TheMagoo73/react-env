
import { TestScheduler } from "jest";
import { reducer } from "../src/reducer";

const initialState = {
    state: 'LOADING'
};

describe("reducer", () => {
  test("can be created", () => {
    const newState = reducer(initialState, {});

    expect(newState).toEqual(initialState);
  });

  test("can be loaded", () => {
    const newState = reducer(
        initialState,
        {type: 'LOADED', payload: {env: {foo: 'bar'}}});

    expect(newState).toEqual({
      ...initialState,
      state: 'LOADED',
      env: {
          foo: 'bar'
      },
    });
  });

  test("can be errored", () => {
    const newState = reducer(
        initialState,
        {type: 'ERRORED', payload: {error: 'Foo'}});

    expect(newState).toEqual(      
      expect.objectContaining({
        state: 'ERRORED',
        errorMessage: 'Foo'
      })
    );
  });

});