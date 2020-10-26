import * as React from 'react'

//TODO use/define proper interface
interface Player {
  name: string
  score?: number
  ready: boolean
}

interface PlayersListCardProps {
  players: Array<Player>
}

export default function PlayersListCard({
  players,
}: PlayersListCardProps): JSX.Element {
  return (
    <div className="card-wrapper card-wrapper--pin-size-small results__tables">
      <div className="card card--white card--medium-spacing">
        <div className="card__content">
          <section className="grid grid--gutter-size-medium grid--num-columns-1">
            <section className="grid__column">
              <div className="padding--top-small">
                <table
                  data-qa="highscore-list"
                  className="table table--spacing-small table--highlight-row-on-hover highscore"
                >
                  <tbody>
                    <tr className="table__row table__row--header">
                      <td className="table__cell table__cell--span">
                        <h3 className="heading-2">Players</h3>
                      </td>
                      <td className="table__cell table__cell--align-center table__cell--no-wrap countries-list__header-cell">
                        Score
                      </td>
                      <td className="table__cell table__cell--align-right table__cell--no-wrap countries-list__header-cell">
                        Status
                      </td>
                    </tr>
                    {players.map(player => (
                      <tr className="table__row" role="button">
                        <td className="table__cell table__cell--collapse-left table__cell--span label-2">
                          <section className="stack">
                            <section className="stack__item stack__item--align-vertically highscore__user-pin">
                              <span className="pin pin--border pin--background-brown pin--border-white pin--border-small">
                                <span className="pin__border">
                                  <img
                                    src="https://www.geoguessr.com/_next/static/images/anonymous-avatar-8b77f771c6a2b06ebffedc913cc40f32.svg"
                                    alt={player.name}
                                  />
                                </span>
                              </span>
                            </section>
                            <section className="stack__item stack__item--grow stack__item--shrink stack__item--align-vertically highscore__user-nick">
                              {player.name}
                            </section>
                          </section>
                        </td>
                        <td className="table__cell table__cell--align-center table__cell--no-wrap">
                          <div className="game-status__body">
                            {player.score ?? '-'}
                          </div>
                        </td>
                        <td className="table__cell table__cell--align-right table__cell--no-wrap">
                          <span
                            className={`game-settings__checkbox-main-label ${
                              player.ready
                                ? 'stats-card__value'
                                : 'subscription__warning'
                            }`}
                          >
                            {player.ready ? 'READY' : 'NOT READY'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  )
}
