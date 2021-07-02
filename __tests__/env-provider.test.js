import * as React from "react";
import { render, screen } from "@testing-library/react";
import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()
import EnvProvider from "../src/env-provider";
import { act } from "react-dom/test-utils";

const testUrl = 'http://foo.com/bar.json'

jest.mock('../src/reducer')
import { reducer } from '../src/reducer'

describe("provider", () => {

  beforeEach(() => {
    fetch.resetMocks()
  })

  test("it loads environment from a url", async () => {
    fetch.mockResponse(JSON.stringify({foo: 'bar'}));

    await act(async () => {
        render(
        <EnvProvider
          url={testUrl}
        />
      )}
    )

    expect(fetch).toHaveBeenLastCalledWith(testUrl)
    expect(reducer).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'LOADED'
      })
    )
  });

  test("it handles errors getting the environment", async () => {
    fetch.mockReject(new Error('Oops'))

    await act(async () => {
        render(
        <EnvProvider
          url={testUrl}
        />
      )}
    )

    expect(fetch).toHaveBeenLastCalledWith(testUrl)
    expect(reducer).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        type: 'ERRORED'
      })
    )
  });

  test("it renders the children element", async () => {
    fetch.mockResponse(JSON.stringify({foo: 'bar'}))
    
    await act(async () => {
      render(
        <EnvProvider url={testUrl}>
          <h1>Hello Flagsmith!</h1>
        </EnvProvider>
      )}
    )

    expect(
      screen.getByRole("heading", { level: 1, name: /Hello Flagsmith/i })
    ).toBeInTheDocument();
  });
});