const express = require("express");
const mongoose = require("mongoose");
const GayPerson = require("./models/gayPersonSchema");
const app = express();

const PORT = 4000;

app.use(express.json());

app.get("/people/lgbt/:id", async (req, res) => {
  try {
    const person = await GayPerson.findOne({ personalId: req.params.id });
    if (!person) {
      res.json({ error: "Invalid Person ID", status: 404 });
    }
    res.json({
      name: `${person.name}`,
      age: person.age,
      pronouns: person.pronouns,
      sexuality: person.sexuality,
    });
  } catch (E) {
    console.log(E);
  }
});

app.post("/people/lgbt", (req, res) => {
  if (
    !req.body.name ||
    !req.body.age ||
    !req.body.pronouns ||
    !req.body.sexuality
  ) {
    return res.json({
      error: "Name, Age, Pronouns And/Or Sexuality are required!",
      status: 400,
    });
  }
  const gayPerson = new GayPerson({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age,
    pronouns: req.body.pronouns,
    sexuality: req.body.sexuality,
    personalId: s4(),
  });

  gayPerson.save().catch((e) => console.log(e));
  res.status(200).json({
    message: "Created person succesfully!",
    name: req.body.name,
    age: req.body.age,
    pronouns: req.body.pronouns,
    sexuality: req.body.sexuality,
  });
});

app.listen(PORT, () => {
  mongoose
    .connect(
      "mongodb+srv://GayAPI:GayAPI123Gay@gay.sbbhd.mongodb.net/GayDataBase?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to the database!");
    });
  console.log(`Listening on http://localhost:${PORT}`);
});

let s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
