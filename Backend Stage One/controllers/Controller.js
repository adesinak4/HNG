const moment = require('moment');

const getData = (req, res) => {
  const slack_name = req.query.slack_name;
  const track = req.query.track;
  const currentDay = moment().format('dddd');
  const currentUTCTime = moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

  const jsonResponse = {
    slack_name: slack_name,
    current_day: currentDay,
    utc_time: currentUTCTime,
    track: track,
    github_file_url: 'https://github.com/adesinak4/HNG/blob/main/Backend%20Stage%20One/app.js',
    github_repo_url: 'https://github.com/adesinak4/HNG/tree/main/Backend%20Stage%20One',
    status_code: 200,
  };

  res.json(jsonResponse);
};

module.exports = {
  getData,
};
