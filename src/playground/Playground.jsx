import { useState } from 'react'
import { registry } from '../registry/index'
import PropControls from '../components/PropControls'
import CodeSnippet from '../components/CodeSnippet'

function defaultValues(schema) {
  return Object.fromEntries(schema.map((p) => [p.name, p.default]))
}

export default function Playground() {
  const [selectedName, setSelectedName] = useState(registry[0].name)
  const entry = registry.find((r) => r.name === selectedName)

  const [propValues, setPropValues] = useState(defaultValues(entry.props))

  function handleSelectComponent(name) {
    const next = registry.find((r) => r.name === name)
    setSelectedName(name)
    setPropValues(defaultValues(next.props))
  }

  function handlePropChange({ propName, value }) {
    setPropValues((prev) => ({ ...prev, [propName]: value }))
  }

  const Component = entry.component

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-[24px] py-[14px] flex items-center gap-[16px]">
        <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-widest">
          Sandbox
        </span>
        <div className="flex gap-[4px]">
          {registry.map((r) => (
            <button
              key={r.name}
              onClick={() => handleSelectComponent(r.name)}
              className={[
                'px-[12px] py-[6px] rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer',
                r.name === selectedName
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800',
              ].join(' ')}
            >
              {r.name}
            </button>
          ))}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Preview */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-[48px]">
            <Component {...propValues} />
          </div>
          <div className="border-t border-gray-200 p-[24px]">
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-[12px]">
              Code
            </p>
            <CodeSnippet componentName={entry.name} props={propValues} />
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-[260px] border-l border-gray-200 bg-white p-[20px] flex flex-col gap-[20px] shrink-0">
          <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
            Props
          </p>
          <PropControls
            schema={entry.props}
            values={propValues}
            onChange={handlePropChange}
          />
        </aside>

      </div>
    </div>
  )
}
