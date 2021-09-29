const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { PORT, UPSIDEDOWN_MODE } = process.env;
const option = UPSIDEDOWN_MODE === 'true';

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);
// fix

app.use(cors());

const hereIsTheUpsideDown = option;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );
// fix
  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
