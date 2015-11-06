type HTTPHeader = {name: string, value: string};

const
  editedRequests = {},
  requestsFilter = {
    urls: ['http://*/*', 'https://*/*'],
    types: ['main_frame']
  };

chrome.webRequest.onHeadersReceived.addListener(
  ({responseHeaders, requestId, tabId}:
    {responseHeaders: Array<HTTPHeader>, requestId: string, tabId: string}
  ) => {
    if (responseHeaders && tabId !== -1) {
      const ctHeader: HTTPHeader = responseHeaders.find(({name}) => /^content-type$/i.test(name));

      if (ctHeader && ctHeader.value === 'application/jwt') {
        ctHeader.value = 'text/jwt';
        editedRequests[requestId] = true;
        return {responseHeaders};
      }
    }
  },

  requestsFilter,

  ['responseHeaders', 'blocking']
);

chrome.webRequest.onCompleted.addListener(
  ({requestId, tabId}: {requestId: string, tabId: string}) => {
    if (editedRequests[requestId]) {
      chrome.tabs.executeScript(tabId, {file: 'content.js'});
    }
  },

  requestsFilter
);
