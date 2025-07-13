type FetchAndSetParams = {
  url: string;
  method: string;
  headers?: HeadersInit;
  body: object;
  setStateFn: (value: string | object | string[] | object[]) => void;
  errorMsg: string;
  setErrorStateFn: (value: string) => void;
  auxFn?: () => void;
};

export const fetchAndSetData = async ({
  url,
  method,
  headers = { "Content-Type": "application/json" },
  body,
  setStateFn,
  errorMsg,
  setErrorStateFn,
  auxFn,
}: FetchAndSetParams) => {
  const response = await fetch(url, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    if (setErrorStateFn) setErrorStateFn(errorMsg);
    return;
  }

  const data = await response.json();
  setStateFn(data);
  if (auxFn) auxFn();
};
