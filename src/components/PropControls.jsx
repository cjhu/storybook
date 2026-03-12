export default function PropControls({ schema, values, onChange }) {
  return (
    <div className="flex flex-col gap-[12px]">
      {schema.map((prop) => (
        <div key={prop.name} className="flex items-center justify-between gap-[16px]">
          <label className="text-[13px] font-mono text-gray-500 shrink-0">
            {prop.name}
          </label>

          {prop.type === 'boolean' && (
            <Toggle
              value={values[prop.name]}
              onChange={(val) => onChange({ propName: prop.name, value: val })}
            />
          )}

          {prop.type === 'string' && (
            <input
              type="text"
              value={values[prop.name]}
              onChange={(e) => onChange({ propName: prop.name, value: e.target.value })}
              className="text-[13px] border border-gray-200 rounded-[4px] px-[8px] py-[4px] w-[160px] focus:outline-none focus:border-blue-400"
            />
          )}

          {prop.type === 'select' && (
            <select
              value={values[prop.name]}
              onChange={(e) => onChange({ propName: prop.name, value: e.target.value })}
              className="text-[13px] border border-gray-200 rounded-[4px] px-[8px] py-[4px] w-[160px] focus:outline-none focus:border-blue-400 bg-white"
            >
              {prop.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  )
}

function Toggle({ value, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={[
        'relative w-[36px] h-[20px] rounded-full transition-colors cursor-pointer shrink-0',
        value ? 'bg-blue-600' : 'bg-gray-200',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform',
          value ? 'translate-x-[18px]' : 'translate-x-[2px]',
        ].join(' ')}
      />
    </button>
  )
}
