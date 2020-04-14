import React from 'react'
import {render, cleanup} from '@testing-library/react'
import App from './App'

// cleanup after each test to avoid memory leaks 
afterEach(cleanup)
 
//testing to ensure fragment of the App component matches the snapshot
 it('should take a snapshot', () => {
    const { asFragment } = render(<App />)
    
    expect(asFragment(<App />)).toMatchSnapshot()
  });