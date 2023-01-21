export const useHttp = () => {
  const request = async (
    url: string,
    method: string = "GET",
    body: null | string = null,
    headers: {"Content-Type": string} = { "Content-Type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        if (response.status === 500) {
          console.log(`Car's engine was damaged`);
          
          return response.status
        } else {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }        
      }

      const data = await response.json();

      return data;
    } catch (e) { 
        throw e;
    }
  };

  return { request };
};
