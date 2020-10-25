import * as React from 'react'

interface ToggleProps {
  onClick: (isChecked: boolean) => void
  mainLabel: string
  subLabel?: string
}

export default function Toggle({
  onClick,
  mainLabel,
  subLabel,
}: ToggleProps): JSX.Element {
  return (
    <div>
      <label className="checkbox">
        <input
          type="checkbox"
          className="checkbox__input"
          name="show-game-settings"
          onChange={event => onClick(event.target.checked)}
        />
        <span className="checkbox__mark checkbox__mark--dark"></span>
        <span className="game-settings__checkbox-main-label">{mainLabel}</span>
        {subLabel && (
          <>
            <br />
            <span className="game-settings__checkbox-sub-label">
              {subLabel}
            </span>
          </>
        )}
      </label>
    </div>
  )
}
