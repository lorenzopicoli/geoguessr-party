import { browser } from 'webextension-polyfill-ts'

// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener(
  (request: { popupMounted: boolean; partyLink: string }) => {
    // Log statement if request.popupMounted is true
    // NOTE: this request is sent in `popup/component.tsx`
    if (request.partyLink) {
      console.log('bó começar a festa')
    }

    if (request.popupMounted) {
      console.log('backgroundPage notified that Popup.tsx has mounted.')
    }
  },
)
