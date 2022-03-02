var selectedDate = document.getElementById('date');
selectedDate.addEventListener('change', function () {
  fetchTimes(selectedDate.value);
});

const fetchTimes = date => {
  let dateA = date.split('-');
  date =
    parseInt(dateA[0], 10) +
    '/' +
    parseInt(dateA[1], 10) +
    '/' +
    parseInt(dateA[2], 10);
  fetch(
    `https://us-central1-drive-safe-medicals-26e5f.cloudfunctions.net/getFreeDates?date=${date}`
  )
    .then(response => response.json())
    .then(data => {
        console.log({data, l: data.length})
      const availableHours = document.getElementById('AvailableHours');
      availableHours.innerHTML = '';
      if (date.length > 0) {
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
        availableHours.appendChild(option);
      }
    });
};
