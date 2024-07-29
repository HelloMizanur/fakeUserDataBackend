const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/generate', (req, res) => {
  const { region, seed, errorsPerRecord, page } = req.body;
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const users = [];
  for (let i = startIndex; i < endIndex; i++) {
    users.push({
      id: i + 1,
      randomIdentifier: uuidv4(),
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      region: region
    });
  }
  res.json({ users, pageSize });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
