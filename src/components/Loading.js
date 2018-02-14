import React from 'react'

class Loading extends React.Component {
  state = {
    text: ''
  }
  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.intervalId = setInterval(() => {
        this.setState(({ text }) => {
          return {
            text:
              text === '' || text === 'Loading'
                ? 'Loading.'
                : text === 'Loading.'
                  ? 'Loading..'
                  : text === 'Loading..' ? 'Loading...' : 'Loading'
          }
        })
      }, 1000)
    }, 2000)
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
    clearTimeout(this.timeoutId)
  }

  render() {
    return <div>{this.state.text}</div>
  }
}

export default Loading
