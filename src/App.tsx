import React from 'react'
import { hot } from 'react-hot-loader/root'
import Header from './components/header'

type AppProps = { num: number }

const App = ({ num }: AppProps) => (
  <div>
    <Header />
    <h1>Number Prop: {num}</h1>
  </div>
)

export default hot(App)
