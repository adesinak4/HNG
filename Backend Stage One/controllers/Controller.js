const moment = require('moment');

const getData = (req, res) => {
  const slackName = req.query.slack_name;
  const track = req.query.track;
  const currentDay = moment().format('dddd');
  const currentUTCTime = moment().utc().format();

  const jsonResponse = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: currentUTCTime,
    track: track,
    github_file_url: 'https://github.com/username/repo/blob/main/file_name.ext',
    github_repo_url: 'https://github.com/username/repo',
    status_code: 200,
  };

  res.json(jsonResponse);
};

module.exports = {
  getData,
};
