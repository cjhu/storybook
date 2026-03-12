import { useState } from 'react'
import Editor from '@monaco-editor/react'
import LivePreview from './LivePreview'

const STARTER = `function MyComponent() {
  const [count, setCount] = React.useState(0)

  return (
    <div style={{ padding: 32, fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ fontSize: 20, marginBottom: 16, fontWeight: 600 }}>
        Hello from the editor
      </h2>
      <p style={{ color: '#6b7280', marginBottom: 16 }}>
        Edit this component and see it update live.
      </p>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: '8px 16px',
          background: '#111827',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        Count: {count}
      </button>
    </div>
  )
}

export default MyComponent
`

export default function CodeEditorTab() {
  const [code, setCode] = useState(STARTER)

  return (
    <div className="flex flex-1 overflow-hidden">

      {/* Editor pane */}
      <div className="flex flex-col w-[55%] border-r border-gray-200">
        <div className="px-[16px] py-[10px] border-b border-gray-200 bg-white">
          <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">Editor</p>
          <p className="text-[11px] text-gray-400 mt-[2px]">
            React is pre-injected — use <code className="bg-gray-100 px-[4px] rounded-[3px]">React.useState</code> etc. directly.
          </p>
        </div>
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={(val) => setCode(val ?? '')}
            theme="vs-dark"
            options={{
              fontSize: 13,
              lineHeight: 22,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              padding: { top: 16, bottom: 16 },
              renderLineHighlight: 'none',
              overviewRulerLanes: 0,
              folding: false,
            }}
          />
        </div>
      </div>

      {/* Preview pane */}
      <div className="flex flex-col flex-1">
        <div className="px-[16px] py-[10px] border-b border-gray-200 bg-white">
          <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">Preview</p>
        </div>
        <div className="flex-1 overflow-auto p-[32px] bg-gray-50">
          <LivePreview code={code} />
        </div>
      </div>

    </div>
  )
}
