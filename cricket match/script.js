document.addEventListener('DOMContentLoaded', () => {
  const resultContainer = document.getElementById('result');

  const defaultMatch = {
    title: '',
    venue: '',
    series: '',
    date: '',
    team1: {
      name: '',
      runs: '',
      wickets: '',
      overs: '',
      extras: '',
      powerplay: '',
    },
    team2: {
      name: '',
      runs: '',
      wickets: '',
      overs: '',
      extras: '',
      powerplay: '',
    }
  };

  function getValue(id, fallback = '') {
    const element = document.getElementById(id);
    return element ? element.value.trim() || fallback : fallback;
  }

  function getNumber(id, fallback = 0) {
    const raw = getValue(id, fallback.toString());
    const value = Number(raw);
    return Number.isFinite(value) ? value : fallback;
  }

  function fillDefaultInputs() {
    document.getElementById('match-title').value ||= defaultMatch.title;
    document.getElementById('match-venue').value ||= defaultMatch.venue;
    document.getElementById('match-series').value ||= defaultMatch.series;
    document.getElementById('match-date').value ||= defaultMatch.date;
    document.getElementById('team1-name').value ||= defaultMatch.team1.name;
    document.getElementById('team1-runs').value ||= defaultMatch.team1.runs;
    document.getElementById('team1-wickets').value ||= defaultMatch.team1.wickets;
    document.getElementById('team1-overs').value ||= defaultMatch.team1.overs;
    document.getElementById('team1-extras').value ||= defaultMatch.team1.extras;
    document.getElementById('team1-powerplay').value ||= defaultMatch.team1.powerplay;
    document.getElementById('team2-name').value ||= defaultMatch.team2.name;
    document.getElementById('team2-runs').value ||= defaultMatch.team2.runs;
    document.getElementById('team2-wickets').value ||= defaultMatch.team2.wickets;
    document.getElementById('team2-overs').value ||= defaultMatch.team2.overs;
    document.getElementById('team2-extras').value ||= defaultMatch.team2.extras;
    document.getElementById('team2-powerplay').value ||= defaultMatch.team2.powerplay;
  }

  function getTeamData(prefix, defaults) {
    return {
      name: getValue(`${prefix}-name`, defaults.name),
      runs: getNumber(`${prefix}-runs`, defaults.runs),
      wickets: getNumber(`${prefix}-wickets`, defaults.wickets),
      overs: getValue(`${prefix}-overs`, defaults.overs),
      extras: getNumber(`${prefix}-extras`, defaults.extras),
      powerplay: getValue(`${prefix}-powerplay`, defaults.powerplay),
    };
  }

  function getTotalScore(team) {
    return team.runs + team.extras;
  }

  function validateMatchInfo() {
    const requiredFields = [
      { id: 'match-title', label: 'Match Title' },
      { id: 'match-venue', label: 'Venue' },
      { id: 'match-series', label: 'Series' },
      { id: 'match-date', label: 'Match Date' },
    ];

    const missing = requiredFields.filter(field => !getValue(field.id));
    if (missing.length > 0) {
      const labels = missing.map(field => field.label).join(', ');
      alert(`Please enter the following match information before continuing: ${labels}`);
      return false;
    }

    return true;
  }

  function renderTeamResult(team) {
    return `
      <div class="team-summary">
        <h3>${team.name}</h3>
        <p><strong>Total:</strong> ${getTotalScore(team)}/${team.wickets}</p>
        <p><strong>Runs:</strong> ${team.runs}</p>
        <p><strong>Extras:</strong> ${team.extras}</p>
        <p><strong>Overs:</strong> ${team.overs}</p>
        <p><strong>Powerplay:</strong> ${team.powerplay}</p>
      </div>
    `;
  }

  function renderResult() {
    if (!validateMatchInfo()) {
      return;
    }

    const matchTitle = getValue('match-title', defaultMatch.title);
    const venue = getValue('match-venue', defaultMatch.venue);
    const series = getValue('match-series', defaultMatch.series);
    const date = getValue('match-date', defaultMatch.date);

    const team1 = getTeamData('team1', defaultMatch.team1);
    const team2 = getTeamData('team2', defaultMatch.team2);

    const score1 = getTotalScore(team1);
    const score2 = getTotalScore(team2);

    let resultText = '';
    if (score1 > score2) {
      resultText = `${team1.name} won by ${score1 - score2} runs.`;
    } else if (score2 > score1) {
      resultText = `${team2.name} won by ${score2 - score1} runs.`;
    } else {
      resultText = 'Match tied.';
    }

    resultContainer.innerHTML = `
      <div class="result-header">
        <h2>${matchTitle}</h2>
        <p>${series} · ${venue} · ${date}</p>
      </div>
      <div class="result-grid">
        ${renderTeamResult(team1)}
        ${renderTeamResult(team2)}
      </div>
      <div class="match-summary">
        <p><strong>Match Result:</strong> ${resultText}</p>
      </div>
    `;
  }

  function resetForm() {
    document.getElementById('match-title').value = defaultMatch.title;
    document.getElementById('match-venue').value = defaultMatch.venue;
    document.getElementById('match-series').value = defaultMatch.series;
    document.getElementById('match-date').value = defaultMatch.date;
    document.getElementById('team1-name').value = defaultMatch.team1.name;
    document.getElementById('team1-runs').value = defaultMatch.team1.runs;
    document.getElementById('team1-wickets').value = defaultMatch.team1.wickets;
    document.getElementById('team1-overs').value = defaultMatch.team1.overs;
    document.getElementById('team1-extras').value = defaultMatch.team1.extras;
    document.getElementById('team1-powerplay').value = defaultMatch.team1.powerplay;
    document.getElementById('team2-name').value = defaultMatch.team2.name;
    document.getElementById('team2-runs').value = defaultMatch.team2.runs;
    document.getElementById('team2-wickets').value = defaultMatch.team2.wickets;
    document.getElementById('team2-overs').value = defaultMatch.team2.overs;
    document.getElementById('team2-extras').value = defaultMatch.team2.extras;
    document.getElementById('team2-powerplay').value = defaultMatch.team2.powerplay;
    resultContainer.innerHTML = '';
  }

  document.getElementById('calculate-btn').addEventListener('click', renderResult);
  document.getElementById('reset-btn').addEventListener('click', resetForm);
  fillDefaultInputs();
  resetForm();
});
