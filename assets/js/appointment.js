(async () => {
  await fetch(
    `https://us-central1-drive-safe-medicals-26e5f.cloudfunctions.net/getLocations`
  )
    .then(response => response.json())
    .then(data => {
      const servingLocations = document.getElementById('servingLocations');
      servingLocations.innerHTML = '';
      servingLocations.innerHTML =
        '<option value="">Select a location</option>';
      data.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.innerHTML = location;
        servingLocations.appendChild(option);
      });
    })
    .catch(err => {
      alert(
        `Something went wrong. If You have paid the fee, kindly contact us. ${err}`
      );
    });
})();
(
  function(){
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const { type} = params;
    if(type)
    document.getElementById("Medical Type").value=type
  }
)();



const body = {
  appointmentTime: undefined,
  fullName: undefined,
  dob: undefined,
  email: undefined,
  phone: undefined,
  address: undefined,
  appointmentType: undefined,
  appointmentDate: undefined,
  origin: window.location.origin,
};

const timeFetcher = {
  date: undefined,
  location: undefined,
};

const selectedDate = document.getElementById('date');
selectedDate.addEventListener('change', function () {
  timeFetcher.date = selectedDate.value;
  fetchTimes();
});

const selectedLocation = document.getElementById('servingLocations');
selectedLocation.addEventListener('change', function () {
  timeFetcher.location = selectedLocation.value;
  fetchTimes();
});

const fetchTimes = async () => {
  if (!timeFetcher.date || !timeFetcher.location) return;
  console.log('got both date and location', timeFetcher);
  let dateA = timeFetcher.date.split('-');
  timeFetcher.date =
    parseInt(dateA[0], 10) +
    '/' +
    parseInt(dateA[1], 10) +
    '/' +
    parseInt(dateA[2], 10);
  await fetch(
    `https://us-central1-drive-safe-medicals-26e5f.cloudfunctions.net/getFreeTimes?date=${timeFetcher.date}&location=${timeFetcher.location}`
  )
    .then(response => response.json())
    .then(data => {
      const availableHours = document.getElementById('AvailableHours');
      availableHours.innerHTML = '';
      if (date.length > 0) {
        body.appointmentDate = date.split('/').reverse().join('/');
        body.appointmentTime = undefined;
        data.forEach(hour => {
          const option = document.createElement('option');
          option.value = hour;
          option.innerHTML = hour;
          availableHours.appendChild(option);
        });
      } else {
        const option = document.createElement('option');
        option.innerHTML = 'Select a date';
        option.value = '';
        availableHours.firstChild = option;
      }
    })
    .catch(err => {
      alert(
        'Something went wrong. If You have paid the fee, kindly contact us.'
      );
    });
};

document
  .getElementById('AvailableHours')
  .addEventListener('change', function () {
    body.appointmentTime = document.getElementById('AvailableHours').value;
  });

document.getElementById('apptBtn').addEventListener('click', async function () {
  body.address = document.getElementById('address').value;
  body.fullName = document.getElementById('name').value;
  body.email = document.getElementById('email').value;
  body.phone = document.getElementById('phone').value;
  body.dob = document.getElementById('dob').value;
  body.appointmentType = document.getElementById('Medical Type').value;
  if (Object.keys(body).every(key => body[key])) {
    await bookAppointment(body);
  } else {
    alert('Please fill out all fields');
  }
});

const bookAppointment = async body => {
  await fetch(
    'https://us-central1-drive-safe-medicals-26e5f.cloudfunctions.net/bookAppointment',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    }
  )
    .then(response => response.json())
    .then(data => {
      const { url } = data;
      window.location.href = url;
    })
    .catch(err => {
      alert(
        'Something went wrong. If You have paid the fee, kindly contact us.'
      );
    });
};
