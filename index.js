import express from "express";
const app = express();
app.use(express.json());
const port = 3001;

const users = [
  { email: "tejasphthomas29@gmail.com", password: "hello123" },
  { email: "jupitersorbeet@gmail.com", password: "Bello123" },
  { email: "jupitasdashsdt@gmail.com", password: "Bello123" },
  { email: "tejasasdfasdt@gmail.com", password: "Bello123" },
];

app.get("/", (req, res) => {
  res.send("The 5 am club.");
});

app.put("/update", (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        users[i].password = password;
        return res
          .status(200)
          .json({ message: "password updated.", updated_details: users[i] });
      }
    }

    return res.status(400).json({ message: "Email not found." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.delete("/delete", (req, res) => {
  const { email } = req.query;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        users.splice(i, 1);
        return res.status(200).json({ message: "User deleted successfully." });
      }
    }

    return res.status(400).json({ message: "Email not found." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
