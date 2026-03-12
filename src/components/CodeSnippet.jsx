import { useState } from 'react'

function formatProps(props) {
  return Object.entries(props).map(([key, value]) => {
    if (typeof value === 'string') return `${key}='${value}'`
    return `${key}={${JSON.stringify(value)}}`
  })
}

export default function CodeSnippet({ componentName, props }) {
  const [copied, setCopied] = useState(false)

  const propStrings = formatProps(props)
  const hasProps = propStrings.length > 0

  const snippet = hasProps
    ? `<${componentName}\n${propStrings.map((p) => `  ${p}`).join('\n')}\n/>`
    : `<${componentName} />`

  function handleCopy() {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="relative rounded-[6px] bg-gray-950 text-gray-100 font-mono text-[13px]">
      <pre className="p-[16px] overflow-x-auto leading-[1.6]">
        <span className="text-blue-400">&lt;{componentName}</span>
        {propStrings.map((p) => {
          const [name, ...rest] = p.split('=')
          const val = rest.join('=')
          return (
            <span key={name}>
              {'\n  '}
              <span className="text-emerald-400">{name}</span>
              <span className="text-gray-400">=</span>
              <span className="text-amber-300">{val}</span>
            </span>
          )
        })}
        {hasProps ? (
          <span className="text-blue-400">{'\n'}/&gt;</span>
        ) : (
          <span className="text-blue-400"> /&gt;</span>
        )}
      </pre>

      <button
        onClick={handleCopy}
        className="absolute top-[8px] right-[8px] px-[8px] py-[4px] rounded-[4px] text-[11px] font-sans transition-colors cursor-pointer
          bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
