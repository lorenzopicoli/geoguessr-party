import * as React from 'react'

interface PartyModeToggleProps {
  onClick: (isChecked: boolean) => void
}

export default function PartyModeToggle({
  onClick,
}: PartyModeToggleProps): JSX.Element {
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
        <span className="game-settings__checkbox-main-label">Party mode</span>
        <br />
        <span className="game-settings__checkbox-sub-label">
          All rounds will be automatically synced for every user in this
          challenge
        </span>
      </label>
    </div>
  )
}
