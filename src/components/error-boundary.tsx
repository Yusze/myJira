import React from 'react'
type FallbackRender = (props:{error:Error | null}) => React.ReactElement
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:FallbackRender}>, {error:Error | null}>{
  state = {error: null}

  // 当子组件抛出异常 error State就会被重新赋值
  static getDerivedStateFromError(error:Error) {
    return {error}
  }

  render() {
    const {error} = this.state;
    const {fallbackRender, children} = this.props;
    if (error) {
      return fallbackRender({error});
    }
    return children;
  }
}