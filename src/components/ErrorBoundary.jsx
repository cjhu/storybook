import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="w-full rounded-[6px] bg-red-50 border border-red-200 p-[16px]">
          <p className="text-[12px] font-semibold text-red-600 mb-[6px]">Runtime error</p>
          <pre className="text-[12px] text-red-500 whitespace-pre-wrap leading-[1.5]">
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
