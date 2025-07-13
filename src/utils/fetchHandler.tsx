type FetchAndSetParams = {
  url: string;
  method: string;
  headers: HeadersInit;
  body: object;
  setStateFn: (value: string | object | string[] | object[]) => void;
  errorMsg: string;
  setErrorStateFn: (value: string) => void;
};

export const fetchAndSetData = async ({
  url,
  method,
  headers = { "Content-Type": "application/json" },
  body,
  setStateFn,
  errorMsg,
  setErrorStateFn,
}: FetchAndSetParams) => {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    setErrorStateFn(errorMsg);
    return;
  }

  const data = await response.json();
  setStateFn(data);
};
