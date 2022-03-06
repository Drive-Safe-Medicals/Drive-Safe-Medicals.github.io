const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const { userId } = params;

(async function () {
  await fetch(
    'https://us-central1-drive-safe-medicals-26e5f.cloudfunctions.net/paymentSessionComplete',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ userId }),
    }
  )
    .then(response => response.json())
    .then(data => {
      if (data === 'success') {
      window.location.replace('success.html');
;      }
    })
    .catch(err => {
      alert('Something went wrong. If You have paid the fee, kindly contact us.');
    });
})();
