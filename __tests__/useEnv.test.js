import * as React from "react"
import { renderHook } from '@testing-library/react-hooks'

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

import { useEnv, EnvProvider } from '../src/'
import { act } from '@testing-library/react'

const testURL = "http://foo.com/bar.json"
const defaultEnv = {bar: 'foo'}
const wrapper = ({children}) => (
    <EnvProvider url={testURL} defaultEnv={defaultEnv}>{children}</EnvProvider>
)

describe('useEnv', () => {

    beforeEach(() => {
        fetch.resetMocks()
    })

    test("if context is not defined, throw an error", () => {

        const { result } = renderHook(() => useEnv())
        expect(result.error).toEqual(
            Error("useEnv must be used within an EnvProvider")
        )
    })

    test("loads the environment", async () => {
        fetch.mockResponse(JSON.stringify({foo: 'bar'}));

        const { result, waitForNextUpdate } = renderHook(() => useEnv(), {
            wrapper
        })
        await waitForNextUpdate()

        expect(result.current.state).toEqual('LOADED')
        expect(result.current.env).toEqual({foo: 'bar'})
    })

    test("handles failing to load the environment", async () => {
        fetch.mockReject(new Error('oops'))

        const { result, waitForNextUpdate } = renderHook(() => useEnv(), {
            wrapper
        })
        await waitForNextUpdate()

        expect(result.current.state).toEqual('ERRORED')
        expect(result.current.errorMessage).toEqual('oops')
        expect(result.current.env).toEqual(defaultEnv)
    })
})