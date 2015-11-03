type HTTPHeader = {name: string, value: string};

chrome.webRequest.onHeadersReceived.addListener(
  ({responseHeaders} :{responseHeaders :Array<HTTPHeader>}) => {
    console.log('onHeadersReceived', responseHeaders);
    if (responseHeaders) {
      const ctHeader :HTTPHeader = responseHeaders.find(({name}) => /^content-type$/i.test(name));
      if (ctHeader && ctHeader.value === 'application/jwt') {
        ctHeader.value = 'text/plain';
        console.log('UPDATED!');
        chrome.webRequest.handlerBehaviorChanged();
      }
    }
  },

  {
    urls: ['http://localhost/*'],
    types: ['main_frame']
  },

  ['responseHeaders']
);
