const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const presidents = JSON.parse(fs.readFileSync('presidents.json', 'utf8'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);
  const sort = req.query.sort;
  const sortMethod = sort === 'asc' ? sortAscByName : sortDescByName;
  const words = req.query.text.toLowerCase().split(' ');

  const presidentsFound = presidents.filter((element) => {
    const president = `${element.name.toLowerCase()} ${element.surname.toLowerCase()} ${element.age}`;
    let includes = false;
    words.forEach((word) => {
      includes = president.includes(word) || includes;
    });
    return includes;
  });

  presidentsFound.sort(sortMethod);

  const count = presidentsFound.length;
  const records = presidentsFound.slice(offset, offset + limit);

  setTimeout(() => {
    res.send({records, pagination: {offset, limit, count, sort}});
  }, 1000);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001...');
});

function sortAscByName(a, b) {
  let nameA = a.name.toLowerCase();
  let nameB = b.name.toLowerCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

function sortDescByName(a, b) {
  let nameA = a.name.toLowerCase();
  let nameB = b.name.toLowerCase();
  if (nameA < nameB) {
    return 1;
  }
  if (nameA > nameB) {
    return -1;
  }
  return 0;
}
