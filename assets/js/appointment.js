const selectedDate = document.getElementById('date');
selectedDate.addEventListener('change', function () {
  fetchTimes(selectedDate.value);
});

document.getElementById('AvailableHours').hidden = true;
document.getElementById('Medical Type').hidden = true;
document.getElementById('source').hidden = true;
document.getElementById('apptBtn').disabled = true;

const fetchTimes = async date => {
  document.getElementById('AvailableHours').hidden = true;
  document.getElementById('Medical Type').hidden = true;
  document.getElementById('source').hidden = true;
  document.getElementById('apptBtn').disabled = false;
  let dateA = date.split('-');
  date =
    parseInt(dateA[0], 10) +
    '/' +
    parseInt(dateA[1], 10) +
    '/' +
    parseInt(dateA[2], 10);
  await fetch(
    `https://us-central1-drive-safe-medicals-26e5f.cloudfunctions.net/getFreeDates?date=${date}`
  )
    .then(response => response.json())
    .then(data => {
      const availableHours = document.getElementById('AvailableHours');
      availableHours.innerHTML = '';
      if (date.length > 0) {
        data.forEach(hour => {
          const option = document.createElement('option');
          option.value = hour;
          option.innerHTML = hour;
          availableHours.appendChild(option);
        });
        document.getElementById('AvailableHours').hidden = false;
        document.getElementById('Medical Type').hidden = false;
        document.getElementById('source').hidden = false;
        document.getElementById('apptBtn').disabled = true;
      } else {
        const option = document.createElement('option');
        option.innerHTML = 'Select a date';
        option.value = '';
        availableHours.firstChild = option;
      }
    });
};
