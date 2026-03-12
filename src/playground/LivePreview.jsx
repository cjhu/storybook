import { useState, useEffect, useRef } from 'react'
import React from 'react'
import * as Babel from '@babel/standalone'
import ErrorBoundary from '../components/ErrorBoundary'

function transpileAndEval(code) {
  const transpiled = Babel.transform(code, {
    presets: ['react', 'env'],
    filename: 'component.jsx',
  }).code

  const module = { exports: {} }

  // Stub require so `import React from 'react'` works if the user writes it
  const require = (mod) => {
    if (mod === 'react') return React
    throw new Error(`Cannot import '${mod}' — only React is available in the live editor`)
  }

  const fn = new Function('React', 'require', 'module', 'exports', transpiled)
  fn(React, require, module, module.exports)

  const Component = module.exports.default
  if (typeof Component !== 'function') throw new Error('No default export found. Make sure your component uses `export default`.')
  return Component
}

export default function LivePreview({ code }) {
  const [Component, setComponent] = useState(null)
  const [error, setError] = useState(null)
  const previewKey = useRef(0)

  useEffect(() => {
    try {
      const Comp = transpileAndEval(code)
      previewKey.current++
      setComponent(() => Comp)
      setError(null)
    } catch (err) {
      setError(err)
    }
  }, [code])

  if (error) {
    return (
      <div className="w-full rounded-[6px] bg-red-50 border border-red-200 p-[16px]">
        <p className="text-[12px] font-semibold text-red-600 mb-[6px]">Compile error</p>
        <pre className="text-[12px] text-red-500 whitespace-pre-wrap leading-[1.5]">
          {error.message}
        </pre>
      </div>
    )
  }

  if (!Component) return null

  return (
    <ErrorBoundary key={previewKey.current}>
      <Component />
    </ErrorBoundary>
  )
}
