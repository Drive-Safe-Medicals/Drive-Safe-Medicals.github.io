const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const { userId } = params;

(async function () {
  document.getElementById('loader').style.display = 'block';
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
      document.getElementById('loader').style.display = 'none';
      const s = 'string';
      if (data.toLowerCase().startsWith('success')) {
        // window.location.href = window.location.origin;

        document
          .getElementById('myModal-success')
          .style.setProperty('display', 'block');
        document
          .getElementById('myModal-success')
          .style.setProperty('opacity', 1);
      }
    })
    .catch(err => {
      alert(
        `Something went wrong. If You have paid the fee, kindly contact us.\n ${err}`
      );
      document
        .getElementById('myModalFailure')
        .style.setProperty('display', 'block');
      document.getElementById('myModalFailure').style.setProperty('opacity', 1);
    });
})();
