import { useState } from 'react'
import { registry } from '../registry/index'
import PropControls from '../components/PropControls'
import CodeSnippet from '../components/CodeSnippet'
import CodeEditorTab from './CodeEditorTab'

function defaultValues(schema) {
  return Object.fromEntries(schema.map((p) => [p.name, p.default]))
}

const TABS = ['Components', 'Code Editor']

export default function Playground() {
  const [activeTab, setActiveTab] = useState('Components')

  // Components tab state
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
      <header className="border-b border-gray-200 bg-white px-[24px] py-[14px] flex items-center gap-[20px]">
        <span className="text-[13px] font-semibold text-gray-400 uppercase tracking-widest shrink-0">
          Sandbox
        </span>

        {/* Top-level tabs */}
        <div className="flex gap-[4px]">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                'px-[12px] py-[6px] rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer',
                tab === activeTab
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800',
              ].join(' ')}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Component picker — only visible on Components tab */}
        {activeTab === 'Components' && registry.length > 1 && (
          <>
            <div className="w-[1px] h-[20px] bg-gray-200" />
            <div className="flex gap-[4px]">
              {registry.map((r) => (
                <button
                  key={r.name}
                  onClick={() => handleSelectComponent(r.name)}
                  className={[
                    'px-[12px] py-[6px] rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer',
                    r.name === selectedName
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800',
                  ].join(' ')}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </>
        )}
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {activeTab === 'Components' && (
          <>
            <main className="flex-1 flex flex-col overflow-hidden">
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
          </>
        )}

        {activeTab === 'Code Editor' && <CodeEditorTab />}

      </div>
    </div>
  )
}
