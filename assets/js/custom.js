const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const { appointmentTime, userRecord } = params;
console.log({ appointmentTime, userRecord });
